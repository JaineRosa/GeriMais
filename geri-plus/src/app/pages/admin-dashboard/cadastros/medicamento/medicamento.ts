import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormCadastro, CampoConfig } from '../../../../shared/components/form-cadastro/form-cadastro';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [CommonModule, FormCadastro],
  templateUrl: './medicamento.html',
  styleUrls: ['./medicamento.scss'],
})
export class Medicamento {
  medicamentoCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Medicamento',
      tipo: 'text',
      placeholder: 'Digite o nome do medicamento',
      validacao: [Validators.required],
    },
    {
      nome: 'dosagem',
      label: 'Dosagem',
      tipo: 'text',
      placeholder: 'Ex: 500mg',
      validacao: [Validators.required],
    },
    {
      nome: 'frequenciaDiaria',
      label: 'Frequência Diária',
      tipo: 'text',
      placeholder: 'Ex: 2 vezes ao dia',
      validacao: [Validators.required],
    },
    {
      nome: 'duracaoTratamento',
      label: 'Duração do Tratamento',
      tipo: 'text',
      placeholder: 'Ex: 10 dias',
    },
    {
      nome: 'viaAdministracao',
      label: 'Via de Administração',
      tipo: 'select',
      opcoes: [
        { value: 'ORAL', label: 'Oral' },
        { value: 'INJETAVEL', label: 'Injetável' },
        { value: 'TOPICA', label: 'Tópica' },
        { value: 'OUTRA', label: 'Outra' },
      ],
    },
    {
      nome: 'observacoes',
      label: 'Observações',
      tipo: 'textarea',
      placeholder: 'Observações adicionais',
    },
    {
      nome: 'dataPrescricao',
      label: 'Data da Prescrição',
      tipo: 'date',
      validacao: [Validators.required],
    },
    {
      nome: 'medicoId',
      label: 'ID do Médico',
      tipo: 'text',
      placeholder: 'Identificador do médico',
      validacao: [Validators.required],
    },
    {
      nome: 'idosoId',
      label: 'ID do Idoso',
      tipo: 'text',
      placeholder: 'Identificador do idoso',
      validacao: [Validators.required],
    },
    {
      nome: 'agendamentosId',
      label: 'Agendamentos',
      tipo: 'array',
      arrayItemPlaceholder: 'ID do agendamento',
    },
  ];

  onSubmitMedicamento(payload: any): void {
    const data = {
      ...payload,
    };

    console.log('Payload Medicamento:', data);
    // Futuramente: integrar com backend via HttpClient ou service
  }
}
