"""
Exemple de configuration FastAPI pour l'API Gestion RH Assistant
Assurez-vous d'installer les dépendances nécessaires :
pip install fastapi uvicorn python-multipart sqlalchemy psycopg2-binary
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import os

# Modèles de données
class ChatRequest(BaseModel):
    message: str
    model: str
    temperature: float

class ChatResponse(BaseModel):
    response: Optional[str] = None
    message: Optional[str] = None
    error: Optional[str] = None

# Initialisation de l'application
app = FastAPI(
    title="Gestion RH Assistant",
    description="API simplifiée avec assistant IA pour la gestion des ressources humaines",
    version="1.0.0"
)

# Configuration CORS
# IMPORTANT: Ajoutez votre URL Netlify ici après le déploiement
ALLOWED_ORIGINS = [
    "http://localhost:4200",  # Développement local Angular
    "http://localhost:3000",  # Alternative
    # Ajoutez votre URL Netlify ici, par exemple:
    # "https://votre-app.netlify.app",
    # "https://*.netlify.app",  # Pour tous les sous-domaines Netlify
]

# Si vous utilisez des variables d'environnement
if os.getenv("ALLOWED_ORIGINS"):
    ALLOWED_ORIGINS.extend(os.getenv("ALLOWED_ORIGINS").split(","))

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "Accept"],
    expose_headers=["Content-Type"],
    max_age=3600,
)

# Endpoint de chat
@app.post("/assistant/chat", response_model=ChatResponse)
async def chat_with_assistant(request: ChatRequest):
    """
    Permet de discuter avec l'assistant IA pour obtenir des informations 
    sur la gestion des primes et le Code du travail sénégalais.
    """
    try:
        # TODO: Implémentez votre logique d'assistant IA ici
        # Exemple avec une réponse simple
        response_text = f"Vous avez demandé: {request.message} (Modèle: {request.model}, Température: {request.temperature})"
        
        # Ici, vous intégreriez votre modèle IA (OpenAI, Claude, etc.)
        # et votre logique de traitement avec PostgreSQL
        
        return ChatResponse(
            response=response_text,
            message=response_text
        )
    
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Erreur lors du traitement de la requête: {str(e)}"
        )

# Endpoint de santé
@app.get("/health")
async def health_check():
    """Vérifie que l'API est opérationnelle"""
    return {"status": "ok", "message": "API is running"}

# Pour lancer l'application en développement
# uvicorn main:app --reload --host 0.0.0.0 --port 8000

