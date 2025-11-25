import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

import {
  FormCadastro,
  CampoConfig,
} from '../../../../shared/components/form-cadastro/form-cadastro';
import { ListaCards } from '../../../../shared/components/lista-cards/lista-cards';
import { MedicamentoService } from '../../../../core/service/medicamento.service';

@Component({
  selector: 'app-medicamento',
  standalone: true,
  imports: [CommonModule, FormCadastro, ListaCards],
  templateUrl: './medicamento.html',
  styleUrls: ['./medicamento.scss'],
})
export class Medicamento implements OnInit {
  
  listaMedicamentos: MedicamentoModel[] = [];
  initialValue: any = null;
  modoEdicao = false;

  constructor(private medicamentoService: MedicamentoService) {}

  ngOnInit(): void {
    this.carregarMedicamentos();
  }

  
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
      nome: 'viaAdministracao',
      label: 'Via de Administração',
      tipo: 'select',
      opcoes: [
        { value: 'ORAL', label: 'Oral' },
        { value: 'INJETAVEL', label: 'Injetável' },
        { value: 'TOPICA', label: 'Tópica' },
        { value: 'INALATORIA', label: 'Inalatória' },
        { value: 'RETAL', label: 'Retal' },
        { value: 'VAGINAL', label: 'Vaginal' },
        { value: 'OUTRA', label: 'Outra' },
      ],
      validacao: [Validators.required],
    },
    {
      nome: 'observacoes',
      label: 'Observações (Gerais)',
      tipo: 'textarea',
      placeholder: 'Informações importantes sobre o uso ou armazenamento',
    },
  ];

  
  carregarMedicamentos() {
    
    this.medicamentoService.listarTodos().subscribe({
      next: (data) => {
        this.listaMedicamentos = data;
      },
      error: (err) => {
        console.error('Erro ao carregar medicamentos:', err);
      },
    });
  }

  novoCadastro() {
    this.initialValue = null; 
    this.modoEdicao = true;
  }

  abrirFormEdicao(item: any) {
    
    this.initialValue = item;
    this.modoEdicao = true;
  }

  onSubmitMedicamento(payload: any): void {
    
    const medicamentoData: MedicamentoModel = { ...payload };

    let operacao: Observable<MedicamentoModel>;

    if (this.initialValue && this.initialValue.id) {
      
      operacao = this.medicamentoService.atualizar(this.initialValue.id, medicamentoData);
    } else {
      
      operacao = this.medicamentoService.criar(medicamentoData);
    }

    operacao.subscribe({
      next: () => {
        alert('Medicamento salvo com sucesso!');
        this.modoEdicao = false;
        this.initialValue = null;
        this.carregarMedicamentos(); 
      },
      error: (err) => {
        console.error('Erro ao salvar medicamento:', err.error || err);
        alert(`Erro ao salvar medicamento: ${err.error?.message || 'Verifique o console.'}`);
      },
    });
  }

  onExcluir(item: any) {
    if (!item.id) {
      alert('Medicamento sem ID para exclusão.');
      return;
    }

    if (confirm(`Tem certeza que deseja excluir o medicamento ${item.nome}?`)) {
      this.medicamentoService.excluir(item.id).subscribe({
        next: () => {
          alert('Medicamento excluído com sucesso!');
          this.carregarMedicamentos();
        },
        error: (err) => {
          console.error('Erro ao excluir medicamento:', err);
          alert(`Erro ao excluir medicamento: ${err.error?.message || 'Verifique o console.'}`);
        },
      });
    }
  }
}
