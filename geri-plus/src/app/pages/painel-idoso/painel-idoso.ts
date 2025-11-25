import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PainelContainer } from './components/painel-container/painel-container';



@Component({
  selector: 'app-painel-idoso',
  standalone: true,
  imports: [CommonModule, PainelContainer],
  templateUrl: './painel-idoso.html',
  styleUrls: ['./painel-idoso.scss'],
})
export class PainelIdoso {
  nomeFamiliar = localStorage.getItem('nomeFamiliar') || '';
  nomeHospede = localStorage.getItem('nomeHospede') || '';
  cpfHospede = localStorage.getItem('cpfHospede') || '';

  
}
