# Gestion RH Assistant - Frontend Angular

Application Angular pour interagir avec l'API Gestion RH Assistant.

## Fonctionnalités

- 💬 Interface de chat moderne et intuitive
- 🤖 Intégration avec l'API assistant
- ⚙️ Configuration du modèle IA et de la température
- 📱 Design responsive
- ✨ Animations et transitions fluides

## Prérequis

- Node.js (version 18 ou supérieure)
- npm ou yarn

## Installation

1. Installer les dépendances :
```bash
npm install
```

## Configuration

L'application est configurée pour utiliser l'API FastAPI déployée sur Vercel :
- **URL API**: `https://gestion-rh-pi.vercel.app/chat`
- **Documentation API**: [https://gestion-rh-pi.vercel.app/docs](https://gestion-rh-pi.vercel.app/docs)

Les URLs sont configurées dans :
- `src/environments/environment.ts` (développement)
- `src/environments/environment.prod.ts` (production)

## Lancement

Pour démarrer l'application en mode développement :

```bash
npm start
```

L'application sera accessible sur `http://localhost:4200`

## Structure du projet

```
src/
├── app/
│   ├── chat/
│   │   ├── chat.component.ts
│   │   ├── chat.component.html
│   │   └── chat.component.css
│   ├── models/
│   │   └── chat.model.ts
│   ├── services/
│   │   └── assistant.service.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── styles.css
└── main.ts
```

## API

L'application communique avec l'endpoint `/chat` de l'API FastAPI qui accepte :

**Requête :**
```json
{
  "message": "string",
  "model": "string",
  "temperature": 0
}
```

**Réponse :**
```json
{
  "response": "string"
}
```

## Technologies utilisées

- Angular 19
- TypeScript
- RxJS
- CSS3 (animations et gradients)
- API FastAPI (déployée sur Vercel)

## Documentation supplémentaire

- `API_INTEGRATION.md` - Guide d'intégration avec l'API
- `NETLIFY_DEPLOY.md` - Guide de déploiement sur Netlify
- `FASTAPI_CONFIG.md` - Configuration CORS et déploiement FastAPI

