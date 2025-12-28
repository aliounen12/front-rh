import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ChatRequest, ChatResponse } from '../models/chat.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssistantService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  chat(request: ChatRequest): Observable<ChatResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http.post<ChatResponse>(this.apiUrl, request, { 
      headers,
      withCredentials: false
    }).pipe(
      catchError((error: HttpErrorResponse) => {
        // Extraire le message d'erreur de l'API
        let errorMessage = 'Erreur inconnue';
        
        if (error.error) {
          if (typeof error.error === 'string') {
            errorMessage = error.error;
          } else if (error.error.detail) {
            errorMessage = error.error.detail;
          } else if (error.error.message) {
            errorMessage = error.error.message;
          } else if (error.error.error) {
            errorMessage = error.error.error;
          }
        } else if (error.message) {
          errorMessage = error.message;
        }
        
        // Retourner une réponse avec le message d'erreur
        return throwError(() => ({
          ...error,
          errorMessage: errorMessage,
          status: error.status,
          statusText: error.statusText
        }));
      })
    );
  }
}

