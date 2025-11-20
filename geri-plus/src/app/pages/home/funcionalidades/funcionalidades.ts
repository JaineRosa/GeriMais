import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-funcionalidades',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './funcionalidades.html',
  styleUrls: ['./funcionalidades.scss']
})
export class Funcionalidades {
  cards = [
    {
      title: 'Cadastro completo de hóspedes',
      description: 'Registre dados completos dos residentes com histórico clínico.',
      icon: 'fa-solid fa-user'
    },
    {
      title: 'Prescrição médica organizada',
      description: 'Organize prescrições com segurança e rastreabilidade.',
      icon: 'fa-solid fa-file-medical'
    },
    {
      title: 'Controle financeiro',
      description: 'Acompanhe receitas, despesas e relatórios contábeis.',
      icon: 'fa-solid fa-coins'
    },
    {
      title: 'Prontuário eletrônico integrado',
      description: 'Centralize informações médicas e de cuidados em um prontuário digital seguro.',
      icon: 'fa-solid fa-notes-medical'
    },
    {
      title: 'Alertas inteligentes no sistema',
      description: 'Receba notificações automáticas para eventos críticos e lembretes importantes.',
      icon: 'fa-solid fa-bell'
    },
    {
      title: 'Login individual e seguro',
      description: 'Cada usuário possui credenciais únicas com autenticação segura.',
      icon: 'fa-solid fa-lock'
    },
    {
      title: 'Acesso web multiplataforma',
      description: 'Utilize o sistema em qualquer dispositivo com acesso à internet.',
      icon: 'fa-solid fa-globe'
    },
    {
      title: 'Suporte técnico especializado',
      description: 'Equipe disponível para auxiliar em dúvidas e problemas técnicos.',
      icon: 'fa-solid fa-headset'
    },
    {
      title: 'Atualizações e melhorias contínuas',
      description: 'Receba novas funcionalidades e correções de forma constante.',
      icon: 'fa-solid fa-sync'
    }
  ];
}
