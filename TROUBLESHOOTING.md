# Guide de dépannage

## Erreur : "OPENROUTER_API_KEY n'est pas configurée"

### Problème
L'API retourne une erreur 400 avec le message : `"OPENROUTER_API_KEY n'est pas configurée"`

### Cause
Votre API FastAPI sur Vercel nécessite une clé API OpenRouter pour fonctionner, mais cette variable d'environnement n'est pas configurée dans Vercel.

### Solution

1. **Obtenir une clé API OpenRouter**
   - Allez sur [OpenRouter](https://openrouter.ai/)
   - Créez un compte et obtenez votre clé API

2. **Configurer la variable d'environnement sur Vercel**
   - Allez sur votre projet Vercel : [vercel.com](https://vercel.com)
   - Sélectionnez votre projet `gestion-rh-pi`
   - Allez dans **Settings** > **Environment Variables**
   - Ajoutez une nouvelle variable :
     - **Name**: `OPENROUTER_API_KEY`
     - **Value**: Votre clé API OpenRouter
     - **Environments**: Sélectionnez Production, Preview, et Development
   - Cliquez sur **Save**

3. **Redéployer l'application**
   - Après avoir ajouté la variable, Vercel redéploiera automatiquement
   - Ou allez dans **Deployments** et cliquez sur **Redeploy**

### Vérification

Testez l'API après la configuration :

```bash
curl -X POST https://gestion-rh-pi.vercel.app/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"test","model":"gpt-3.5-turbo","temperature":0.7}'
```

Vous devriez recevoir une réponse valide au lieu d'une erreur 400.

## Autres erreurs courantes

### Erreur CORS

**Symptôme**: Erreur dans la console du navigateur : `Access to XMLHttpRequest has been blocked by CORS policy`

**Solution**: 
- Vérifiez que votre API FastAPI autorise les requêtes depuis votre domaine
- Ajoutez votre URL Netlify dans `allow_origins` du middleware CORS

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:4200",
        "https://votre-site.netlify.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### Erreur 404

**Symptôme**: `404 Not Found` lors de l'appel à l'API

**Solution**:
- Vérifiez que l'endpoint est bien `/chat` et non `/assistant/chat`
- Vérifiez l'URL dans `src/environments/environment.prod.ts`

### Erreur de connexion

**Symptôme**: `Impossible de se connecter à l'API`

**Solution**:
- Vérifiez que l'API Vercel est accessible
- Vérifiez votre connexion internet
- Vérifiez que l'URL de l'API est correcte

## Test de l'API

### Avec curl (Linux/Mac)
```bash
curl -X POST https://gestion-rh-pi.vercel.app/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "Bonjour",
    "model": "gpt-3.5-turbo",
    "temperature": 0.7
  }'
```

### Avec PowerShell (Windows)
```powershell
Invoke-RestMethod -Uri "https://gestion-rh-pi.vercel.app/chat" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body '{"message":"Bonjour","model":"gpt-3.5-turbo","temperature":0.7}'
```

### Avec le navigateur
Allez sur [https://gestion-rh-pi.vercel.app/docs](https://gestion-rh-pi.vercel.app/docs) et testez l'endpoint `/chat` directement depuis l'interface Swagger.

