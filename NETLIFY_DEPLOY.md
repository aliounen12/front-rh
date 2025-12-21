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

## Configuration de l'API FastAPI

⚠️ **Important** : 

1. **Configurer l'URL de l'API dans Angular**
   - Mettez à jour `src/environments/environment.prod.ts` avec l'URL de votre API de production
   - Exemple: `apiUrl: 'https://votre-api.railway.app/assistant/chat'`

2. **Configurer CORS dans FastAPI**
   - Voir le fichier `FASTAPI_CONFIG.md` pour les détails
   - Ajoutez votre URL Netlify dans `allow_origins` de votre middleware CORS
   - Exemple de configuration dans `FASTAPI_EXAMPLE.py`

3. **Variables d'environnement**
   - Configurez `ALLOWED_ORIGINS` dans votre API FastAPI avec l'URL Netlify
   - Format: `"https://votre-site.netlify.app"`

## Mise à jour automatique

Une fois connecté à Git, chaque push sur la branche principale déclenchera automatiquement un nouveau déploiement.

