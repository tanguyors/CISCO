# Formation Cisco - Plateforme Interactive

Site web interactif pour la formation Cisco avec navigation intuitive et accès aux ressources pédagogiques.

## 🚀 Fonctionnalités

- **Navigation intuitive** : Interface moderne et responsive
- **6 modules de formation** complets avec contenu détaillé :
  - Réseau - Routage
  - VLAN
  - Administration Cisco - SSH
  - STP
  - Etherchannel
  - DHCP, DNS, FTP, etc
- **Vidéos YouTube intégrées** : Vidéos pédagogiques pour chaque module et section
- **Contenu détaillé** : 
  - Aperçu de chaque module
  - Concepts clés expliqués
  - Commandes Cisco avec exemples
  - Objectifs d'apprentissage
- **Accès aux ressources** :
  - Cours théoriques (PDF)
  - Exercices pratiques (LABs)
  - Corrigés des exercices
- **Visualisation intégrée** : Affichage des PDFs directement dans le navigateur
- **Téléchargement** : Possibilité de télécharger tous les documents

## 📁 Structure

```
.
├── index.html          # Page principale
├── styles.css          # Styles CSS
├── script.js           # Logique JavaScript
├── data.js             # Données des modules
└── README.md           # Documentation
```

## 🚀 Installation

1. **Installer les dépendances** :
```bash
npm install
```

## 🎯 Utilisation

### Démarrage du serveur

```bash
npm start
```

Ou pour utiliser http-server directement :
```bash
npm run serve
```

Le serveur démarre sur `http://localhost:8000` et ouvre automatiquement votre navigateur.

### Navigation

1. Utilisez le menu pour accéder aux différents modules
2. Cliquez sur "Voir" pour afficher un PDF dans le navigateur
3. Cliquez sur "Télécharger" pour sauvegarder un document

## 📱 Compatibilité

- Compatible avec tous les navigateurs modernes (Chrome, Firefox, Safari, Edge)
- Interface responsive (mobile, tablette, desktop)
- Fonctionne sans serveur web (fichiers statiques)

## 🎨 Personnalisation

Vous pouvez modifier :
- Les couleurs dans `styles.css` (variables CSS)
- Les données des modules dans `data.js`
- Le comportement dans `script.js`

## 📝 Notes

- Les PDFs doivent être accessibles depuis le navigateur (chemins relatifs)
- Le serveur Node.js permet un affichage optimal des PDFs avec support CORS
- Nécessite Node.js et npm installés sur votre système

## 🚀 Déploiement sur Vercel

### Option 1 : Via l'interface Vercel (Recommandé)

1. **Installer Vercel CLI** (optionnel) :
```bash
npm i -g vercel
```

2. **Connecter votre projet** :
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez-vous avec GitHub
   - Cliquez sur "New Project"
   - Importez votre dépôt GitHub `tanguyors/CISCO`
   - Vercel détectera automatiquement la configuration

3. **Déployer** :
   - Vercel déploiera automatiquement à chaque push sur GitHub
   - Le site sera disponible sur une URL comme `https://cisco-*.vercel.app`

### Option 2 : Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Déployer
vercel

# Déployer en production
vercel --prod
```

### Configuration Vercel

Le fichier `vercel.json` est déjà configuré pour :
- ✅ Servir les fichiers statiques
- ✅ Activer CORS pour les PDFs
- ✅ Rediriger toutes les routes vers `index.html`

### Après le déploiement

- Votre site sera accessible via une URL Vercel
- Les PDFs fonctionneront correctement grâce à la configuration CORS
- Chaque push sur GitHub déclenchera un nouveau déploiement automatique
