# Configuration FastAPI pour le Frontend Angular

## Configuration CORS dans FastAPI

Pour que votre frontend Angular (déployé sur Netlify) puisse communiquer avec votre API FastAPI, vous devez configurer CORS.

### Exemple de configuration CORS dans FastAPI

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",  # Pour le développement local
        "https://votre-site.netlify.app",  # Votre URL Netlify
        "https://*.netlify.app",  # Tous les sous-domaines Netlify (optionnel)
    ],
    allow_credentials=True,
    allow_methods=["*"],  # Ou spécifiez: ["GET", "POST", "PUT", "DELETE"]
    allow_headers=["*"],  # Ou spécifiez les headers nécessaires
)

@app.post("/assistant/chat")
async def chat_with_assistant(request: ChatRequest):
    # Votre logique ici
    pass
```

### Configuration plus sécurisée (Production)

```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Récupérer les origines depuis les variables d'environnement
ALLOWED_ORIGINS = os.getenv(
    "ALLOWED_ORIGINS",
    "http://localhost:4200,https://votre-site.netlify.app"
).split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    expose_headers=["Content-Type"],
    max_age=3600,
)
```

## Configuration de l'URL de l'API dans Angular

### Pour le développement (déjà configuré)
`src/environments/environment.ts` :
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8000/assistant/chat'
};
```

### Pour la production
Mettez à jour `src/environments/environment.prod.ts` avec l'URL de votre API en production :

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://votre-api.com/assistant/chat'  // Remplacez par votre URL
};
```

## Déploiement de l'API FastAPI

### Options de déploiement

1. **Railway** - Facile et gratuit pour commencer
2. **Render** - Bon pour PostgreSQL
3. **Heroku** - Classique mais payant
4. **DigitalOcean** - Plus de contrôle
5. **AWS/GCP/Azure** - Pour des besoins plus complexes

### Variables d'environnement à configurer

- `DATABASE_URL` - URL de connexion PostgreSQL
- `ALLOWED_ORIGINS` - Origines autorisées pour CORS
- `SECRET_KEY` - Clé secrète pour la sécurité
- Autres variables spécifiques à votre application

## Test de la connexion

Une fois déployé, testez que votre API répond correctement :

```bash
curl -X POST https://votre-api.com/assistant/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Test",
    "model": "gpt-3.5-turbo",
    "temperature": 0.7
  }'
```

## Checklist avant déploiement

- [ ] CORS configuré avec l'URL Netlify
- [ ] URL de l'API mise à jour dans `environment.prod.ts`
- [ ] Variables d'environnement configurées
- [ ] Base de données PostgreSQL accessible depuis le serveur
- [ ] Tests de l'API effectués

