# Guide de déploiement sur Vercel

## 🚀 Déploiement rapide (via GitHub)

### Étape 1 : Push vos changements sur GitHub

```bash
git commit -m "Ajout configuration Vercel"
git push origin master
```

### Étape 2 : Connecter Vercel à GitHub

1. Allez sur [vercel.com](https://vercel.com)
2. Cliquez sur **"Sign Up"** et connectez-vous avec votre compte **GitHub**
3. Cliquez sur **"New Project"**
4. Sélectionnez votre dépôt **`tanguyors/CISCO`**
5. Vercel détectera automatiquement :
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `.` (racine)

### Étape 3 : Configurer le projet

- **Framework Preset**: `Other` ou laissez vide
- **Root Directory**: `.` (racine)
- **Build Command**: `npm run build` (ou laissez vide)
- **Output Directory**: `.` (racine)

### Étape 4 : Déployer

Cliquez sur **"Deploy"**. Vercel va :
1. Cloner votre dépôt
2. Installer les dépendances (`npm install`)
3. Exécuter le build (si nécessaire)
4. Déployer votre site

### Étape 5 : Accéder à votre site

Une fois déployé, vous obtiendrez une URL comme :
- `https://cisco-*.vercel.app`

## 📝 Configuration automatique

Le fichier `vercel.json` est déjà configuré pour :
- ✅ Rediriger toutes les routes vers `index.html` (pour la navigation SPA)
- ✅ Activer CORS pour permettre l'affichage des PDFs
- ✅ Servir les fichiers statiques correctement

## 🔄 Déploiements automatiques

Après la configuration initiale :
- **Chaque push sur `master`** → déploiement automatique en production
- **Chaque pull request** → déploiement de prévisualisation

## 🌐 Domaine personnalisé (optionnel)

1. Allez dans les paramètres du projet sur Vercel
2. Section **"Domains"**
3. Ajoutez votre domaine personnalisé

## 🐛 Dépannage

### Les PDFs ne s'affichent pas
- Vérifiez que les chemins dans `data.js` sont corrects
- Vérifiez les en-têtes CORS dans `vercel.json`

### La navigation ne fonctionne pas
- Vérifiez que la configuration `rewrites` dans `vercel.json` redirige vers `index.html`

### Build échoue
- Vérifiez que `package.json` contient le script `build`
- Vérifiez les logs de build sur Vercel

## 💡 Commandes utiles Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer en preview
vercel

# Déployer en production
vercel --prod

# Voir les logs
vercel logs

# Lister les déploiements
vercel ls
```
