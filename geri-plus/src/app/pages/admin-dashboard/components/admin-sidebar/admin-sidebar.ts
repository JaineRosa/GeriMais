import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule,RouterModule, RouterLink],
  templateUrl: './admin-sidebar.html',
  styleUrl: './admin-sidebar.scss',
})
export class AdminSidebar {
 
  usuarioLogado = 'Administrador';
}
