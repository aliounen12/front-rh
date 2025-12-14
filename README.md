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

Avant de lancer l'application, assurez-vous de configurer l'URL de l'API dans le fichier `src/app/services/assistant.service.ts` :

```typescript
private apiUrl = 'http://localhost:8000/assistant/chat'; // Ajustez selon votre API
```

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

L'application communique avec l'endpoint `/assistant/chat` qui accepte :

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

- Angular 17
- TypeScript
- RxJS
- CSS3 (animations et gradients)

