# Déploiement sur Netlify

## Méthode 1 : Déploiement via Git (Recommandé)

1. **Pousser votre code sur GitHub/GitLab**
   ```bash
   git add .
   git commit -m "Prepare for Netlify deployment"
   git push origin main
   ```

2. **Connecter à Netlify**
   - Allez sur [netlify.com](https://www.netlify.com)
   - Cliquez sur "Add new site" > "Import an existing project"
   - Connectez votre compte GitHub/GitLab
   - Sélectionnez votre repository `front-rh`

3. **Configuration automatique**
   - Netlify détectera automatiquement les paramètres depuis `netlify.toml` :
     - Build command: `npm run build`
     - Publish directory: `dist/front-rh/browser`

4. **Variables d'environnement (optionnel)**
   - Dans les paramètres du site Netlify, allez dans "Site settings" > "Environment variables"
   - Ajoutez `API_URL` avec l'URL de votre API de production
   - Modifiez `src/environments/environment.prod.ts` pour utiliser cette variable

5. **Déployer**
   - Cliquez sur "Deploy site"
   - Netlify construira et déploiera automatiquement votre application

## Méthode 2 : Déploiement via Drag & Drop

1. **Build localement**
   ```bash
   npm run build
   ```

2. **Déployer**
   - Allez sur [app.netlify.com/drop](https://app.netlify.com/drop)
   - Glissez-déposez le dossier `dist/front-rh/browser`

## Configuration de l'API

⚠️ **Important** : Assurez-vous de configurer l'URL de votre API dans `src/environments/environment.prod.ts` avant de déployer.

Si votre API est sur un autre domaine, vous devrez peut-être configurer CORS sur votre serveur backend.

## Mise à jour automatique

Une fois connecté à Git, chaque push sur la branche principale déclenchera automatiquement un nouveau déploiement.

