import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormCadastro, CampoConfig } from '../../../../shared/components/form-cadastro/form-cadastro';
import { UserModel } from '../../../../core/models/user.model';

@Component({
  selector: 'app-medico',
  standalone: true,
  imports: [CommonModule, FormCadastro],
  templateUrl: './medico.html',
  styleUrls: ['./medico.scss'],
})
export class Medico {
  medicoCampos: CampoConfig[] = [
    { nome: 'nome', label: 'Nome do Médico', tipo: 'text', placeholder: 'Digite o nome completo', validacao: [Validators.required] },
    { nome: 'crm', label: 'CRM', tipo: 'text', placeholder: 'Número do CRM', validacao: [Validators.required] },
    { nome: 'especialidade', label: 'Especialidade', tipo: 'text', placeholder: 'Ex: Cardiologia' },
    { nome: 'email', label: 'Email', tipo: 'email', placeholder: 'email@exemplo.com', validacao: [Validators.required, Validators.email] },
    { nome: 'telefone', label: 'Telefone', tipo: 'text', placeholder: '(00) 00000-0000' },
    { nome: 'senha', label: 'Senha', tipo: 'password', placeholder: 'Crie uma senha segura', validacao: [Validators.required] },
  ];

  onSubmitMedico(payload: any): void {
    const data: UserModel = { ...payload, tipoUsuario: 'MEDICO' };
    console.log('Payload Médico:', data);
  }
}
