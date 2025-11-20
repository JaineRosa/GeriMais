import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormCadastro, CampoConfig } from '../../../../shared/components/form-cadastro/form-cadastro';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-cuidador',
  standalone: true,
  imports: [CommonModule, FormCadastro],
  templateUrl: './cuidador.html',
  styleUrls: ['./cuidador.scss'],
})
export class Cuidador {
  cuidadorCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Cuidador',
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
      nome: 'email',
      label: 'Email',
      tipo: 'email',
      placeholder: 'email@exemplo.com',
      validacao: [Validators.required, Validators.email],
    },
    {
      nome: 'telefone',
      label: 'Telefone',
      tipo: 'text',
      placeholder: '(00) 00000-0000',
    },
    {
      nome: 'senha',
      label: 'Senha',
      tipo: 'password',
      placeholder: 'Crie uma senha segura',
      validacao: [Validators.required],
    },
    {
      nome: 'responsavelId',
      label: 'Responsável Vinculado',
      tipo: 'text',
      placeholder: 'ID do Responsável',
      validacao: [Validators.required],
    },
    {
      nome: 'cuidadoresId',
      label: 'Idosos Vinculados',
      tipo: 'array',
      arrayItemPlaceholder: 'ID do Idoso',
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
  ];

  onSubmitCuidador(payload: any): void {
    const data: UserModel = {
      ...payload,
      tipoUsuario: 'CUIDADOR_PROFISSIONAL',
    };

    console.log('Payload Cuidador:', data);
    // Futuramente: integrar com backend via HttpClient ou service
  }
}
