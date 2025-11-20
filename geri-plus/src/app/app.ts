import { Component, signal } from '@angular/core';
import { RouterModule, RouterOutlet, Router } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { CommonModule } from '@angular/common';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule, RouterModule, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('geri-plus');

  // lista centralizada de rotas/prefixos sem layout
  private rotasSemLayout = ['/login', '/admin', '/painel-idoso'];

  constructor(protected router: Router) {}

  private deveOcultar(): boolean {
    // 🔹 Esconde se a rota for exatamente uma das listadas
    // ou se começar com um dos prefixos
    return this.rotasSemLayout.some(
      (rota) => this.router.url === rota || this.router.url.startsWith(rota)
    );
  }

  ocultarNavbar(): boolean {
    return this.deveOcultar();
  }

  ocultarFooter(): boolean {
    return this.deveOcultar();
  }
}
