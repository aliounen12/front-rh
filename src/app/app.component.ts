import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="app-container">
      <header class="app-header">
        <h1>🤖 Gestion RH Assistant</h1>
        <p class="subtitle">Assistant IA pour la gestion des primes et le Code du travail sénégalais</p>
      </header>
      <main class="app-main">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .app-header {
      background: rgba(255, 255, 255, 0.95);
      padding: 2rem;
      text-align: center;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
    .app-header h1 {
      margin: 0;
      color: #333;
      font-size: 2.5rem;
      font-weight: 700;
    }
    .subtitle {
      margin: 0.5rem 0 0 0;
      color: #666;
      font-size: 1.1rem;
    }
    .app-main {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'front-rh';
}

