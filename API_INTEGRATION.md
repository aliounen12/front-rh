# Intégration API FastAPI - Vercel

## Configuration actuelle

L'application Angular est maintenant configurée pour utiliser votre API FastAPI déployée sur Vercel.

### URL de l'API
- **Production & Développement**: `https://gestion-rh-pi.vercel.app/chat`
- **Documentation API**: [https://gestion-rh-pi.vercel.app/docs](https://gestion-rh-pi.vercel.app/docs)

### Endpoint utilisé
- **POST** `/chat`

### Structure de la requête
```json
{
  "message": "string",
  "model": "string",
  "temperature": 0
}
```

### Structure de la réponse attendue
```json
{
  "response": "string"  // ou "message": "string"
}
```

## Test de l'intégration

### 1. Test en développement local

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200` et communiquera avec l'API Vercel.

### 2. Test de l'API directement

Vous pouvez tester l'API avec curl :

```bash
curl -X POST https://gestion-rh-pi.vercel.app/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Bonjour, pouvez-vous m'aider ?",
    "model": "gpt-3.5-turbo",
    "temperature": 0.7
  }'
```

### 3. Vérification CORS

Assurez-vous que votre API FastAPI sur Vercel autorise les requêtes depuis :
- `http://localhost:4200` (développement)
- `https://votre-site.netlify.app` (production après déploiement)

## Configuration CORS dans FastAPI (si nécessaire)

Si vous rencontrez des erreurs CORS, ajoutez dans votre API FastAPI :

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "https://votre-site.netlify.app",  # Votre URL Netlify
        "https://*.netlify.app",  # Tous les sous-domaines Netlify
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## Déploiement

Une fois déployé sur Netlify, l'application utilisera automatiquement l'URL de production configurée dans `environment.prod.ts`.

## Dépannage

### Erreur CORS
- Vérifiez que l'URL Netlify est dans `allow_origins` de votre API
- Vérifiez les headers de la requête dans la console du navigateur

### Erreur 404
- Vérifiez que l'endpoint est bien `/chat` et non `/assistant/chat`
- Vérifiez l'URL dans `environment.prod.ts`

### Erreur de connexion
- Vérifiez que l'API Vercel est accessible
- Vérifiez la console du navigateur pour les détails de l'erreur

