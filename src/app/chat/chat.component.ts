import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssistantService } from '../services/assistant.service';
import { ChatRequest } from '../models/chat.model';

interface Message {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messages: Message[] = [];
  userMessage: string = '';
  isLoading: boolean = false;
  selectedModel: string = 'gpt-3.5-turbo';
  temperature: number = 0.7;

  models = [
    { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
    { value: 'gpt-4', label: 'GPT-4' },
    { value: 'claude-3', label: 'Claude 3' }
  ];

  constructor(private assistantService: AssistantService) {}

  ngOnInit() {
    this.addWelcomeMessage();
  }

  addWelcomeMessage() {
    this.messages.push({
      content: 'Bonjour ! Je suis votre assistant RH. Je peux vous aider avec des questions sur la gestion des primes et le Code du travail sénégalais. Comment puis-je vous aider ?',
      isUser: false,
      timestamp: new Date()
    });
  }

  sendMessage() {
    if (!this.userMessage.trim() || this.isLoading) {
      return;
    }

    const userMsg = this.userMessage.trim();
    this.userMessage = '';

    // Ajouter le message de l'utilisateur
    this.messages.push({
      content: userMsg,
      isUser: true,
      timestamp: new Date()
    });

    // Envoyer la requête à l'API
    this.isLoading = true;
    const request: ChatRequest = {
      message: userMsg,
      model: this.selectedModel,
      temperature: this.temperature
    };

    this.assistantService.chat(request).subscribe({
      next: (response) => {
        const assistantMessage = response.response || response.message || 'Désolé, je n\'ai pas pu traiter votre demande.';
        this.messages.push({
          content: assistantMessage,
          isUser: false,
          timestamp: new Date()
        });
        this.isLoading = false;
        this.scrollToBottom();
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi du message:', error);
        
        let errorMessage = 'Erreur: Impossible de contacter l\'assistant.';
        
        // Priorité au message d'erreur de l'API
        if (error.errorMessage) {
          errorMessage = `Erreur API: ${error.errorMessage}`;
        } else if (error.status === 0) {
          errorMessage = 'Erreur: Impossible de se connecter à l\'API. Vérifiez votre connexion internet et que l\'API est accessible.';
        } else if (error.status === 404) {
          errorMessage = 'Erreur: Endpoint non trouvé. Vérifiez l\'URL de l\'API.';
        } else if (error.status === 403 || error.status === 401) {
          errorMessage = 'Erreur: Accès refusé. Vérifiez la configuration CORS de l\'API.';
        } else if (error.status === 400) {
          // Erreur 400 - Bad Request
          if (error.error?.detail) {
            errorMessage = `Erreur: ${error.error.detail}`;
          } else if (error.error?.message) {
            errorMessage = `Erreur: ${error.error.message}`;
          } else {
            errorMessage = 'Erreur: Requête invalide. Vérifiez les paramètres envoyés.';
          }
        } else if (error.status >= 500) {
          errorMessage = 'Erreur: Problème serveur. L\'API a rencontré une erreur interne.';
        } else if (error.error?.message) {
          errorMessage = `Erreur: ${error.error.message}`;
        } else if (error.message) {
          errorMessage = `Erreur: ${error.message}`;
        }
        
        this.messages.push({
          content: errorMessage,
          isUser: false,
          timestamp: new Date()
        });
        this.isLoading = false;
        this.scrollToBottom();
      }
    });
  }

  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }

  scrollToBottom() {
    setTimeout(() => {
      const chatContainer = document.querySelector('.chat-messages');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 100);
  }
}

