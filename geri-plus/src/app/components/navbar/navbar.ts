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
  styleUrls: ['./navbar.scss'], 
})
export class Navbar {
  usuarioLogado: any;

  
  constructor(
    private viewportScroller: ViewportScroller,
    public authService: AuthService,
    private router: Router
  ) {
    
    this.usuarioLogado = this.authService.getUsuario();
  }

  scrollTo(section: string) {
    this.viewportScroller.scrollToAnchor(section);
  }

  
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  
  isAdmin(): boolean {
    return this.usuarioLogado?.tipoUsuario === 'ADMIN';
  }

  
  isFamiliar(): boolean {
    return this.usuarioLogado?.tipoUsuario === 'FAMILIAR';
  }

  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
