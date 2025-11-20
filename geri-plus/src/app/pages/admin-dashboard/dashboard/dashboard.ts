import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class Dashboard {
  //Aqui você pode colocar propriedades globais do painel
  // Exemplo: nome do usuário logado, notificações, etc.
  
  usuarioLogado = 'Administrador'; // exemplo
}
