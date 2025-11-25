import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdosoService } from '../../../core/service/idoso.service';
import { CuidadorService } from '../../../core/service/cuidador.service';
import { UserModel } from '../../../core/models/user.model';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class Dashboard implements OnInit {
  totalIdosos: number = 0;
  totalCuidadores: number = 0;
  notificacoesPendentes: number = 7;

  
  constructor(private idosoService: IdosoService, private cuidadorService: CuidadorService) {}

  carregarMetricas(): void {
    
    this.idosoService.listar().subscribe({
      next: (idosos: UserModel[]) => {
        this.totalIdosos = idosos.length;
      },
      error: (err) => {
        console.error('Erro ao buscar idosos', err);
      },
    });

    this.cuidadorService.listar().subscribe({
      next: (cuidadores: UserModel[]) => {
        this.totalCuidadores = cuidadores.length;
      },
      error: (err) => {
        console.error('Erro ao buscar cuidadores', err);
      },
    });
  }

  
  private colors = {
    primary: '#3a7ca5', 
    accent: '#5cb85c', 
    lightBlue: '#00bfff',
    mintGreen: '#98fb98',
    darkBlue: '#1a3d5c',
    forestGreen: '#228b22',
    skyBlue: '#87ceeb',
    limeGreen: '#32cd32',
    error: '#dc3545', 
    exitRed: '#e57373',
    exitRedHover: '#d32f2f',
  };

  ngOnInit() {
    this.carregarMetricas();
    new Chart('lineChart', {
      type: 'line',
      data: {
        labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
        datasets: [
          {
            label: 'Taxa de Ocupação (%)',
            data: [82, 85, 87, 90],
            borderColor: this.colors.primary,
            backgroundColor: this.colors.lightBlue,
            fill: false,
            tension: 0.3,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: { display: true },
        },
      },
    });

    new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['60-70 anos', '71-80 anos', '81+ anos'],
        datasets: [
          {
            data: [40, 55, 25],
            backgroundColor: [this.colors.accent, this.colors.skyBlue, this.colors.darkBlue],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: { position: 'bottom' },
        },
      },
    });

    new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Alimentação', 'Saúde', 'Pessoal', 'Manutenção'],
        datasets: [
          {
            label: 'Custos (R$)',
            data: [45000, 55000, 30000, 15000],
            backgroundColor: [
              this.colors.primary,
              this.colors.accent,
              this.colors.mintGreen,
              this.colors.error,
            ],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false, 
        plugins: {
          legend: { display: false },
        },
      },
    });
  }
}
