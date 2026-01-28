# NetAcademy / Cisco Trainer

Application React lancée proprement avec **Vite**.

## Installation

Dans un terminal à la racine du projet :

```bash
npm install
```

## Lancer en développement

```bash
npm run dev
```

Puis ouvre l'URL indiquée (par défaut `http://localhost:5173`).

## Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (recommandé)

1. **Pousse ton code sur GitHub** :
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Va sur [vercel.com](https://vercel.com)** et connecte-toi avec GitHub

3. **Clique sur "New Project"** et importe ton repository

4. **Vercel détectera automatiquement** que c'est un projet Vite :
   - Framework Preset : **Vite**
   - Build Command : `npm run build` (automatique)
   - Output Directory : `dist` (automatique)
   - Install Command : `npm install` (automatique)

5. **Clique sur "Deploy"** et c'est parti ! 🚀

### Méthode 2 : Via Vercel CLI

1. **Installe Vercel CLI** :
   ```bash
   npm i -g vercel
   ```

2. **Connecte-toi à Vercel** :
   ```bash
   vercel login
   ```

3. **Déploie** :
   ```bash
   vercel
   ```

4. **Pour un déploiement en production** :
   ```bash
   vercel --prod
   ```

### Configuration

Le fichier `vercel.json` est déjà configuré pour Vite. Vercel détectera automatiquement :
- ✅ Framework : Vite
- ✅ Build command : `npm run build`
- ✅ Output directory : `dist`
- ✅ Node.js version : automatique

### Notes importantes

- Les fichiers PDF dans `semaine1/` ne seront **pas** déployés (ils sont ignorés par `.gitignore` si tu les ajoutes)
- Le site sera accessible via une URL Vercel (ex: `ton-projet.vercel.app`)
- Chaque push sur `main` déclenchera un nouveau déploiement automatique
