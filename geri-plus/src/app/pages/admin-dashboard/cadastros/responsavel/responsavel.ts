import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormCadastro, CampoConfig } from '../../../../shared/components/form-cadastro/form-cadastro';

import { UserModel } from '../../../../core/models/user.model';


@Component({
  selector: 'app-responsavel',
  standalone: true,
  imports: [CommonModule, FormCadastro],
  templateUrl: './responsavel.html',
  styleUrls: ['./responsavel.scss'],
})
export class Responsavel {
  responsavelCampos: CampoConfig[] = [
    {
      nome: 'nome',
      label: 'Nome do Responsável',
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

  //constructor(private usuarioService: UsuarioService) {}

  onSubmitResponsavel(payload: any): void {
    const data :UserModel= {
      ...payload,
      tipoUsuario: 'RESPONSAVEL',
    };

   /* this.usuarioService.salvar(data).subscribe({
      next: () => console.log('Responsável cadastrado com sucesso!'),
      error: (err) => console.error('Erro ao salvar responsável', err),
    });
  }*/
  }
}
