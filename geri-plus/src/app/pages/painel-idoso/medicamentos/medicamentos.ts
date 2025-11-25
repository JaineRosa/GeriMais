import { Component, Input } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [CardGenerico, CommonModule, FormsModule],
  templateUrl: './medicamentos.html',
  styleUrls: ['./medicamentos.scss'],
})
export class Medicamentos {
  @Input() cpfHospede!: string;

  medicamentosDoIdoso: any[] = [];
  selectedTipoPrescricao: string = ''; 

  ngOnInit() {
    
    const todosMedicamentos = [
      {
        nome: 'Losartana',
        dosagem: '100mg',
        frequenciaDiaria: '1 vez ao dia',
        duracaoTratamento: 'Indeterminado',
        viaAdministracao: 'ORAL',
        dataPrescricao: '2025-11-20',
        medicoId: 'MED-001',
        idosoId: '909.443.059-20',
        observacoes: 'Controle da pressão arterial',
        status: 'em uso',
      },
      {
        nome: 'Paracetamol',
        dosagem: '500mg',
        frequenciaDiaria: '2 vezes ao dia',
        duracaoTratamento: '7 dias',
        viaAdministracao: 'ORAL',
        dataPrescricao: '2025-11-21',
        medicoId: 'MED-002',
        idosoId: '909.443.059-20',
        observacoes: 'Tomar após as refeições',
        status: 'novo',
      },
      {
        nome: 'Clomipramina',
        dosagem: '75mg',
        frequenciaDiaria: '1 vez ao dia',
        duracaoTratamento: '30 dias',
        viaAdministracao: 'ORAL',
        dataPrescricao: '2025-11-19',
        medicoId: 'MED-003',
        idosoId: '909.443.059-20',
        observacoes: 'Uso noturno',
        status: 'em uso',
      },
    ];

    
    this.medicamentosDoIdoso = todosMedicamentos.filter((m) => m.idosoId === this.cpfHospede);
  }
  
  imprimirPrescricao() {
    let filtrados: any[] = [];

    if (this.selectedTipoPrescricao === 'novos') {
      filtrados = this.medicamentosDoIdoso.filter((m) => m.status === 'novo');
    } else if (this.selectedTipoPrescricao === 'continuos') {
      filtrados = this.medicamentosDoIdoso.filter((m) => m.status === 'em uso');
    }

    if (filtrados.length > 0) {
      console.log('Medicamentos selecionados para impressão:', filtrados);
      alert(
        `Imprimindo ${filtrados.length} medicamento(s): ${filtrados.map((m) => m.nome).join(', ')}`
      );
    } else {
      alert('Nenhum medicamento encontrado para esta opção.');
    }
  }
}
