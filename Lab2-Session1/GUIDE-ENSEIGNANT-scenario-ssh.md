# Guide Enseignant : Scénario de Dépannage SSH - Lab 2 Session 1

> ⚠️ **DOCUMENT CONFIDENTIEL - RÉSERVÉ AUX ENSEIGNANTS**  
> Ce document présente un scénario complet de dépannage SSH avec storytelling, méthodologie et réparation.

---

## 🔧 Comment Casser la Configuration SSH (Pour l'Enseignant)

### Préparation Avant l'Exercice

**Étape 1 : Sauvegarder une Configuration SSH Fonctionnelle**

Avant de casser quoi que ce soit, assurez-vous d'avoir une sauvegarde de la configuration SSH qui fonctionne :

```cisco
Router# copy running-config tftp:
Address or name of remote host []? 192.168.1.10
Destination filename [router-confg]? R-Sec-SSH-backup.cfg
```

Ou sauvegardez localement :
```cisco
Router# copy running-config startup-config
```

**Important :** Notez les IPs, hostnames, noms d'utilisateurs et mots de passe utilisés pour pouvoir restaurer facilement.

---

### Comment Casser : Lignes VTY Sans Authentification Locale

**Méthode : Retirer `login local` des lignes VTY**

**Configuration normale (qui fonctionne) :**
```cisco
Router> enable
Router# configure terminal
Router(config)# line vty 0 4
Router(config-line)# login local
Router(config-line)# transport input ssh
Router(config-line)# end
```

**Commandes pour CASSER la configuration :**
```cisco
Router> enable
Router# configure terminal
Router(config)# line vty 0 4
Router(config-line)# no login local    ← CETTE COMMANDE CASSE LA CONFIG
Router(config-line)# end
```

**Ce qui se passe :**
- Les lignes VTY n'utilisent plus l'authentification locale (`login local`)
- Par défaut, Cisco peut permettre une connexion SSH mais sans authentification utilisateur appropriée
- Les utilisateurs locaux (admin, guest) peuvent se connecter mais **sans pouvoir passer en mode privilégié**
- La commande `enable` échoue car l'authentification locale n'est pas configurée sur les lignes VTY
- L'utilisateur reste bloqué en mode utilisateur (`>`) même s'il connaît le mot de passe enable

**Vérification que c'est bien cassé :**
```cisco
Router# show running-config | section line vty
```

**Résultat attendu :**
```
line vty 0 4
 transport input ssh
 exec-timeout 1 0
```

**Observation :** ❌ La ligne `login local` est absente !

**Test depuis le PC :**
```
PC> ssh -l admin 192.168.1.1
Password: [saisir mot de passe admin]
Router> enable
Password: [saisir mot de passe enable]
% Access denied
```

**Résultat attendu :** 
- ✅ La connexion SSH fonctionne (on arrive sur le routeur)
- ❌ Mais `enable` échoue avec "Access denied" même avec le bon mot de passe
- ❌ L'utilisateur reste bloqué en mode utilisateur (`>`)

---

### ⚠️ Points d'Attention

1. **Ne pas sauvegarder après avoir cassé** : Laissez la config cassée en RAM seulement, ou sauvegardez-la dans un fichier séparé pour pouvoir la restaurer facilement.

2. **Tester avant de donner aux étudiants** : Vérifiez que le problème est bien reproduit et que la méthodologie fonctionne.

3. **Documenter** : Notez exactement ce qui a été modifié pour pouvoir guider les étudiants si nécessaire.

4. **Préparer la solution** : Ayez la commande de réparation prête (`login local`) pour pouvoir aider rapidement.

---

### 🔄 Comment Restaurer Rapidement (Si Besoin)

**Option 1 : Réparer manuellement**
```cisco
Router# configure terminal
Router(config)# line vty 0 4
Router(config-line)# login local
Router(config-line)# end
Router# copy running-config startup-config
```

**Option 2 : Restaurer depuis une sauvegarde**
```cisco
Router# copy tftp: startup-config
Address or name of remote host []? 192.168.1.10
Source filename []? R-Sec-SSH-backup.cfg
Router# reload
```

---

## Scénario : SSH qui Ne Permet Plus l'Accès Privilégié

### 📖 Histoire / Storytelling

**Contexte :**
Vous êtes administrateur réseau chez NovaTech. Hier, vous avez configuré SSH sur le routeur R-Sec pour permettre un accès sécurisé à distance. Tout fonctionnait parfaitement : vous pouviez vous connecter depuis votre PC avec les comptes `admin` et `guest`, et passer en mode privilégié avec `enable`.

**La Situation :**
- Ce matin, un collègue vous appelle : "Je peux me connecter en SSH au routeur, mais je ne peux plus passer en mode privilégié !"
- Vous essayez depuis votre PC : `ssh -l admin 192.168.1.1`
- La connexion SSH fonctionne, vous arrivez sur le routeur
- Mais quand vous tapez `enable` et entrez le mot de passe, vous obtenez "Access denied"
- Vous êtes bloqué en mode utilisateur (`>`) et ne pouvez rien modifier !
- Vous vérifiez : le routeur est bien allumé, les câbles sont branchés, les IPs sont correctes
- Le mot de passe enable est correct (vous l'avez testé en console)
- Mais... vous ne pouvez pas passer en mode privilégié via SSH !

**Le Mystère :**
Vous savez que :
- Le routeur R-Sec a l'IP 192.168.1.1
- Le PC-Tech a l'IP 192.168.1.10
- Les utilisateurs `admin` et `guest` existent bien
- Les clés RSA ont été générées hier
- Le mot de passe enable est correct (testé en console)
- La connexion SSH fonctionne
- Mais... `enable` ne fonctionne plus via SSH !

**Votre Mission :**
Trouver pourquoi `enable` ne fonctionne plus via SSH et le réparer avant que toute l'équipe ne soit bloquée !

---

### 🔍 Méthodologie de Dépannage

#### Étape 1 : Constater le Symptôme Précisément

**Action à faire :**
Depuis le PC-Tech, ouvrir le terminal et tester la connexion SSH :

```
PC> ssh -l admin 192.168.1.1
```

**Résultat observé :**
```
Connecting to 192.168.1.1...
Password: [saisir mot de passe admin]
Router> enable
Password: [saisir mot de passe enable]
% Access denied
Router>
```

**Observation :**
- ✅ La connexion SSH fonctionne (on arrive sur le routeur)
- ✅ L'authentification utilisateur fonctionne (on peut se connecter avec admin)
- ❌ Mais `enable` échoue avec "Access denied"
- ❌ Même avec le bon mot de passe enable, on reste bloqué en mode utilisateur (`>`)

**Question à se poser :**
"Pourquoi `enable` ne fonctionne-t-il plus via SSH alors qu'il fonctionnait hier ?"

---

#### Étape 2 : Vérifier la Connectivité Réseau de Base

**Action à faire :**
Avant de diagnostiquer SSH, vérifier que la connectivité réseau de base fonctionne.

**Test depuis le PC :**
```
PC> ping 192.168.1.1
```

**Résultat attendu :**
```
Pinging 192.168.1.1 with 32 bytes of data:

Reply from 192.168.1.1: bytes=32 time=1ms TTL=255
Reply from 192.168.1.1: bytes=32 time=1ms TTL=255
Reply from 192.168.1.1: bytes=32 time=1ms TTL=255
Reply from 192.168.1.1: bytes=32 time=1ms TTL=255

Ping statistics for 192.168.1.1:
    Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)
```

**Conclusion :**
✅ Le ping fonctionne. Le problème n'est pas au niveau de la connectivité réseau de base. Le routeur est accessible, mais `enable` ne fonctionne pas via SSH.

**Action suivante :**
Passer à la vérification de la configuration SSH.

---

#### Étape 3 : Vérifier l'État SSH sur le Routeur

**Action à faire :**
Se connecter au routeur en console (accès physique) et vérifier l'état SSH.

**Commande à utiliser :**
```cisco
Router> enable
Router# show ip ssh
```

**Résultat observé :**
```
SSH Enabled - version 2.0
Authentication timeout: 120 secs; Authentication retries: 3
```

**Observation :**
- ✅ SSH est activé (version 2.0)
- ✅ Les paramètres SSH semblent corrects
- Mais `enable` échoue quand même via SSH...

**Action suivante :**
Vérifier la configuration des lignes VTY.

---

#### Étape 4 : Vérifier la Configuration des Lignes VTY

**Action à faire :**
Vérifier la configuration complète des lignes VTY pour voir comment l'authentification est configurée.

**Commande à utiliser :**
```cisco
Router# show running-config | section line vty
```

**Résultat observé :**
```
line vty 0 4
 transport input ssh
 exec-timeout 1 0
```

**🔴 PROBLÈME DÉTECTÉ !**

**Observation critique :**
- ✅ `transport input ssh` est présent (SSH est autorisé)
- ❌ `login local` est **ABSENT** !
- ❌ Aucune méthode d'authentification n'est configurée sur les lignes VTY

**Que signifie l'absence de `login local` ?**
- Par défaut, sans `login local`, Cisco peut permettre une connexion SSH mais l'authentification pour `enable` ne fonctionne pas correctement
- Les utilisateurs locaux peuvent se connecter, mais ils ne peuvent pas utiliser leurs privilèges configurés
- La commande `enable` échoue car l'authentification locale n'est pas activée sur les lignes VTY
- Même si l'utilisateur `admin` a le privilège 15, il ne peut pas passer en mode privilégié sans `login local`

**Diagnostic :**
Les lignes VTY ne sont pas configurées pour utiliser l'authentification locale. C'est pour ça que `enable` ne fonctionne plus via SSH, même si la connexion SSH elle-même fonctionne et que les utilisateurs existent.

---

#### Étape 5 : Vérifier que les Utilisateurs Locaux Existent

**Action à faire :**
Vérifier que les utilisateurs locaux sont bien créés (pour confirmer que le problème vient bien des lignes VTY).

**Commande à utiliser :**
```cisco
Router# show running-config | include username
```

**Résultat observé :**
```
username admin privilege 15 secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m0
username guest privilege 1 secret 5 $1$mERr$hx5rVt7rPNoS4wqbXKX7m1
```

**Observation :**
- ✅ Les utilisateurs `admin` et `guest` existent bien
- ✅ Ils ont des mots de passe configurés (chiffrés)
- ✅ Les niveaux de privilège sont corrects (15 pour admin, 1 pour guest)

**Conclusion :**
Les utilisateurs existent et ont les bons privilèges. Le problème vient bien de la configuration des lignes VTY qui ne permet pas à `enable` de fonctionner correctement.

---

#### Étape 6 : Tester `enable` en Console (Pour Comparer)

**Action à faire :**
Pour confirmer que le problème est spécifique à SSH, tester `enable` en console (accès physique).

**Commande à utiliser :**
```cisco
Router> enable
Password: [saisir mot de passe enable]
Router#
```

**Résultat observé :**
```
Router# 
```

**Observation :**
- ✅ `enable` fonctionne parfaitement en console
- ✅ Le mot de passe enable est correct
- ❌ Mais `enable` ne fonctionne pas via SSH

**Conclusion :**
Le problème est spécifique aux connexions SSH/VTY. La configuration des lignes VTY est incorrecte.

---

#### Étape 7 : Identifier la Cause Racine

**Questions à se poser :**
- Pourquoi `login local` a-t-il disparu ?
- Quand cela s'est-il produit ?
- Qui a pu modifier la configuration ?

**Hypothèses possibles :**
1. Un collègue a testé quelque chose et a accidentellement retiré `login local`
2. Une erreur de manipulation lors d'une modification de configuration
3. Une restauration partielle de configuration qui n'a pas inclus cette ligne

**Cause racine identifiée :**
La commande `login local` a été retirée des lignes VTY. Sans cette commande, même si les utilisateurs locaux existent et peuvent se connecter, ils ne peuvent pas utiliser `enable` pour passer en mode privilégié via SSH.

---

#### Étape 8 : Test Final Après Réparation

**Action à faire :**
Après la réparation, tester la connexion SSH et `enable` depuis le PC.

**Test depuis le PC :**
```
PC> ssh -l admin 192.168.1.1
Password: [saisir mot de passe admin]
Router> enable
Password: [saisir mot de passe enable]
Router#
```

**Résultat attendu :**
```
Router# 
```

**Observation :**
- ✅ La connexion SSH fonctionne
- ✅ L'authentification utilisateur fonctionne
- ✅ `enable` fonctionne maintenant avec le mot de passe enable
- ✅ On arrive en mode privilégié (`#`) comme prévu

---

## 🔧 Réparation

### Étape 1 : Accéder au Mode Configuration des Lignes VTY

**Action à faire :**
Se connecter au routeur en console et entrer en mode configuration des lignes VTY.

**Commandes à utiliser :**
```cisco
Router> enable
Router# configure terminal
Router(config)# line vty 0 4
Router(config-line)# 
```

**Explication :**
- `enable` : Passer en mode privilégié (nécessaire pour modifier la configuration)
- `configure terminal` : Entrer en mode configuration globale
- `line vty 0 4` : Configurer les lignes VTY 0 à 4 (les 5 lignes virtuelles)

---

### Étape 2 : Ajouter l'Authentification Locale

**Action à faire :**
Ajouter la commande `login local` pour activer l'authentification via les utilisateurs locaux.

**Commande à utiliser :**
```cisco
Router(config-line)# login local
```

**Explication :**
- `login local` : Active l'authentification via les utilisateurs locaux créés avec `username`
- Sans cette commande, les lignes VTY ne savent pas comment authentifier les utilisateurs pour `enable`
- Avec cette commande, les utilisateurs `admin` et `guest` peuvent se connecter via SSH ET utiliser `enable`

---

### Étape 3 : Vérifier la Configuration

**Action à faire :**
Vérifier que la configuration est correcte avant de quitter le mode configuration.

**Commande à utiliser :**
```cisco
Router(config-line)# exit
Router(config)# show running-config | section line vty
```

**Résultat attendu :**
```
line vty 0 4
 login local
 transport input ssh
 exec-timeout 1 0
```

**Observation :**
- ✅ `login local` est maintenant présent
- ✅ `transport input ssh` est toujours là
- ✅ La configuration est complète

---

### Étape 4 : Sauvegarder la Configuration

**Action à faire :**
Sauvegarder la configuration pour qu'elle persiste après un redémarrage.

**Commande à utiliser :**
```cisco
Router# copy running-config startup-config
```

**Résultat attendu :**
```
Destination filename [startup-config]? 
Building configuration...
[OK]
```

**Explication :**
- Sans cette sauvegarde, la configuration serait perdue au redémarrage
- La configuration est maintenant sauvegardée en NVRAM

---

### Étape 5 : Tester la Connexion SSH

**Action à faire :**
Tester la connexion SSH depuis le PC avec les deux comptes.

**Test 1 : Connexion avec admin**
```
PC> ssh -l admin 192.168.1.1
Password: [saisir le mot de passe admin]
Router> enable
Password: [saisir le mot de passe enable]
Router# 
```

**Test 2 : Connexion avec guest**
```
PC> ssh -l guest 192.168.1.1
Password: [saisir le mot de passe guest]
Router> enable
Password: [saisir le mot de passe enable]
Router# 
```

**Vérifications :**
- ✅ La connexion SSH fonctionne avec `admin`
- ✅ La connexion SSH fonctionne avec `guest`
- ✅ `enable` fonctionne maintenant avec les deux comptes
- ✅ `admin` arrive en mode privilégié (`#`)
- ✅ `guest` peut aussi utiliser `enable` (selon sa configuration de privilège)

---

## 📋 Résumé

### Problème Identifié
Les lignes VTY n'avaient pas la commande `login local`, empêchant l'utilisation de `enable` via SSH même si la connexion SSH fonctionnait.

### Solution Appliquée
Ajout de `login local` dans la configuration des lignes VTY.

### Commandes Clés
- `show running-config | section line vty` : Vérifier la configuration VTY
- `line vty 0 4` : Entrer en mode configuration VTY
- `login local` : Activer l'authentification locale (nécessaire pour `enable` via SSH)
- `copy running-config startup-config` : Sauvegarder

### Points Clés à Retenir
1. **SSH nécessite plusieurs éléments** : IP, clés RSA, utilisateurs locaux, ET `login local` sur les lignes VTY
2. **`login local` est essentiel** : Sans cette commande, même si la connexion SSH fonctionne, `enable` ne fonctionnera pas via SSH
3. **Symptôme subtil** : La connexion SSH peut fonctionner, mais l'accès privilégié est bloqué
4. **Tester complètement** : Ne pas se contenter de vérifier que SSH fonctionne, tester aussi `enable`
5. **Toujours sauvegarder** : Après toute réparation, sauvegarder la configuration

---

## 🎯 Indices pour les Étudiants (Si Bloqués)

### Indice 1 (Facile)
"Vous pouvez vous connecter en SSH, mais `enable` ne fonctionne pas. Vérifiez la configuration des lignes VTY avec `show running-config | section line vty`. Que manque-t-il par rapport à une configuration SSH normale ?"

### Indice 2 (Moyen)
"Les utilisateurs locaux existent, SSH fonctionne, mais `enable` échoue via SSH. Regardez comment les lignes VTY sont configurées pour l'authentification. Comparez avec une connexion console où `enable` fonctionne."

### Indice 3 (Difficile)
"La commande `login local` permet aux lignes VTY d'utiliser les utilisateurs locaux pour l'authentification, y compris pour `enable`. Sans cette commande, même si vous pouvez vous connecter, vous ne pourrez pas passer en mode privilégié via SSH. Cette commande est-elle présente dans votre configuration ?"

---

## 📊 Tableau Récapitulatif

| Élément | État Initial (Cassé) | État Final (Réparé) |
|---------|----------------------|---------------------|
| **SSH activé** | ✅ Oui | ✅ Oui |
| **Clés RSA générées** | ✅ Oui | ✅ Oui |
| **Utilisateurs locaux** | ✅ Oui (admin, guest) | ✅ Oui (admin, guest) |
| **`transport input ssh`** | ✅ Présent | ✅ Présent |
| **`login local`** | ❌ **ABSENT** | ✅ **PRÉSENT** |
| **Connexion SSH** | ✅ Fonctionne | ✅ Fonctionne |
| **`enable` via SSH** | ❌ **ÉCHOUE** | ✅ **FONCTIONNE** |
| **Accès mode privilégié** | ❌ Bloqué (`>`) | ✅ Autorisé (`#`) |

---

## 🔄 Variantes de Scénarios SSH (Pour Autres Exercices)

### Variante 1 : `transport input ssh` Manquant
**Symptôme :** "Connection refused" ou Telnet fonctionne mais pas SSH  
**Cause :** Les lignes VTY autorisent Telnet par défaut, pas SSH  
**Solution :** Ajouter `transport input ssh` dans `line vty 0 4`

### Variante 2 : Clés RSA Non Générées
**Symptôme :** "SSH server not responding"  
**Cause :** Les clés RSA n'ont pas été générées  
**Solution :** `crypto key generate rsa` (minimum 1024 bits)

### Variante 3 : Nom de Domaine Manquant
**Symptôme :** "Could not generate RSA keys" lors de la génération  
**Cause :** Le nom de domaine n'est pas défini  
**Solution :** `ip domain-name novatech.local` avant de générer les clés

### Variante 4 : Utilisateurs Locaux Non Créés
**Symptôme :** "Authentication failed" même avec `login local`  
**Cause :** Aucun utilisateur local n'existe  
**Solution :** Créer les utilisateurs avec `username admin privilege 15 secret [mdp]`

---

**Fin du Guide**
