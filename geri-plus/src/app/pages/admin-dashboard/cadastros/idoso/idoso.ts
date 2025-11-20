import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormCadastro, CampoConfig } from '../../../../shared/components/form-cadastro/form-cadastro';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-idoso',
  standalone: true,
  imports: [CommonModule, FormCadastro],
  templateUrl: './idoso.html',
  styleUrls: ['./idoso.scss'],
})
export class Idoso {
  idosoCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Idoso',
      tipo: 'text',
      placeholder: 'Digite o nome completo',
      validacao: [Validators.required],
    },
    {
      nome: 'cpf',
      label: 'CPF',
      tipo: 'text',
      placeholder: '000.000.000-00',
      validacao: [Validators.required],
    },
    {
      nome: 'dataNascimento',
      label: 'Data de Nascimento',
      tipo: 'date',
      validacao: [Validators.required],
    },
    {
      nome: 'responsavelId',
      label: 'Responsável',
      tipo: 'text',
      placeholder: 'ID do Responsável vinculado',
      validacao: [Validators.required],
    },
    {
      nome: 'quarto',
      label: 'Quarto',
      tipo: 'text',
      placeholder: 'Número ou identificação do quarto',
    },
    {
      nome: 'statusResidencia',
      label: 'Status',
      tipo: 'select',
      opcoes: [
        { value: 'ATIVO', label: 'Ativo' },
        { value: 'INATIVO', label: 'Inativo' },
        { value: 'TRANSFERIDO', label: 'Transferido' },
      ],
    },
    {
      nome: 'medicamentos',
      label: 'Medicamentos',
      tipo: 'array',
      arrayItemPlaceholder: 'Nome do medicamento',
    },
    {
      nome: 'recomendacoesMedicas',
      label: 'Recomendações Médicas',
      tipo: 'array',
      arrayItemPlaceholder: 'Digite uma recomendação',
    },
  ];

  onSubmitIdoso(payload: any): void {
    const data: UserModel = {
      ...payload,
      tipoUsuario: 'IDOSO',
    };

    console.log('Payload Idoso:', data);
    // Aqui você pode integrar com HttpClient ou service futuramente
  }
}
