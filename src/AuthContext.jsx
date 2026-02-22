import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from './supabaseClient';

const AuthContext = createContext(null);

const initialHash = window.location.hash;
const isInviteCallback = initialHash.includes('type=invite') || initialHash.includes('type=signup');

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [needsPasswordSetup, setNeedsPasswordSetup] = useState(isInviteCallback);
  const profileFetched = useRef(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('[AUTH] event:', event, session?.user?.email ?? 'none');
        setUser(session?.user ?? null);

        if (session?.user && !profileFetched.current) {
          profileFetched.current = true;
          // Use setTimeout to avoid Supabase deadlock with auth state change
          setTimeout(() => {
            supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()
              .then(({ data, error }) => {
                console.log('[AUTH] profile:', data, error);
                setProfile(error ? null : data);
                setLoading(false);
              });
          }, 0);
        } else if (!session?.user) {
          profileFetched.current = false;
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Safety fallback
    const timeout = setTimeout(() => {
      console.log('[AUTH] timeout fallback');
      setLoading(false);
    }, 4000);

    return () => {
      clearTimeout(timeout);
      subscription.unsubscribe();
    };
  }, []);

  async function signIn(email, password) {
    profileFetched.current = false;
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email, password
    });
    if (error) setLoading(false);
    return { data, error };
  }

  async function setupPassword(password) {
    const { data, error } = await supabase.auth.updateUser({ password });
    if (!error) setNeedsPasswordSetup(false);
    return { data, error };
  }

  async function signOut() {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
  }

  return (
    <AuthContext.Provider value={{ user, profile, loading, signIn, signOut, needsPasswordSetup, setupPassword }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
