import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormCadastro, CampoConfig } from '../../../../shared/components/form-cadastro/form-cadastro';
import { UserModel } from '../../../../core/models/user.model';


@Component({
  selector: 'app-visitante',
  standalone: true,
  imports: [CommonModule, FormCadastro],
  templateUrl: './visitante.html',
  styleUrls: ['./visitante.scss'],
})
export class Visitante {
  visitanteCampos: CampoConfig[] = [
    { nome: 'nome', label: 'Nome do Visitante', tipo: 'text', placeholder: 'Digite o nome completo', validacao: [Validators.required] },
    { nome: 'cpf', label: 'CPF', tipo: 'text', placeholder: '000.000.000-00', validacao: [Validators.required] },
    { nome: 'email', label: 'Email', tipo: 'email', placeholder: 'email@exemplo.com' },
    { nome: 'telefone', label: 'Telefone', tipo: 'text', placeholder: '(00) 00000-0000' },
    { nome: 'idosoId', label: 'ID do Idoso Visitado', tipo: 'text', placeholder: 'Identificador do idoso', validacao: [Validators.required] },
  ];

  onSubmitVisitante(payload: any): void {
    const data: UserModel = { ...payload, tipoUsuario: 'VISITANTE' };
    console.log('Payload Visitante:', data);
  }
}
