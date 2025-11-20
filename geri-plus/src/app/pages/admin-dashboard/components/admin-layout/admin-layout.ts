import { Component, HostListener } from '@angular/core';
import { AdminHeader } from '../admin-header/admin-header';
import { AdminSidebar } from '../admin-sidebar/admin-sidebar';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [AdminHeader, AdminSidebar, RouterModule, RouterOutlet, CommonModule],
  templateUrl: './admin-layout.html',
  styleUrls: ['./admin-layout.scss'],
})
export class AdminLayout {
  menuAberto = false;
  telaGrande = window.innerWidth > 768;

  @HostListener('window:resize')
  onResize() {
    this.telaGrande = window.innerWidth > 768;
    if (this.telaGrande) {
      this.menuAberto = true;
    }
  }
  ngOnInit() {
    this.onResize();
  }
}
