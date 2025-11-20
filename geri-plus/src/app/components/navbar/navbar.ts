import { Component } from '@angular/core';
import { CommonModule, ViewportScroller } from '@angular/common';
import { RouterModule, RouterLinkActive, RouterLink } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'], // ✅ corrigido: styleUrls (plural)
})
export class Navbar {
  usuarioLogado: any;

  // ✅ tudo dentro de um único construtor
  constructor(
    private viewportScroller: ViewportScroller,
    public authService: AuthService,
    private router: Router
  ) {
    // Recupera o usuário logado ao inicializar
    this.usuarioLogado = this.authService.getUsuario();
  }

  scrollTo(section: string) {
    this.viewportScroller.scrollToAnchor(section);
  }

  // Verifica se há sessão ativa
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Verifica se é admin
  isAdmin(): boolean {
    return this.usuarioLogado?.tipoUsuario === 'ADMIN';
  }

  // Verifica se é familiar
  isFamiliar(): boolean {
    return this.usuarioLogado?.tipoUsuario === 'FAMILIAR';
  }

  // Logout
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
