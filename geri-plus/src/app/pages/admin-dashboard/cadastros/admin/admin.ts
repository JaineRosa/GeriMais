import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormCadastro, CampoConfig } from '../../../../shared/components/form-cadastro/form-cadastro';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormCadastro],
  templateUrl: './admin.html',
  styleUrls: ['./admin.scss'],
})
export class Admin {
  adminCampos: CampoConfig[] = [
    { nome: 'nome', label: 'Nome do Administrador', tipo: 'text', placeholder: 'Digite o nome completo', validacao: [Validators.required] },
    { nome: 'email', label: 'Email', tipo: 'email', placeholder: 'email@exemplo.com', validacao: [Validators.required, Validators.email] },
    { nome: 'telefone', label: 'Telefone', tipo: 'text', placeholder: '(00) 00000-0000' },
    { nome: 'senha', label: 'Senha', tipo: 'password', placeholder: 'Crie uma senha segura', validacao: [Validators.required] },
  ];

  onSubmitAdmin(payload: any): void {
    const data: UserModel = { ...payload, tipoUsuario: 'ADMIN' };
    console.log('Payload Admin:', data);
  }
}
