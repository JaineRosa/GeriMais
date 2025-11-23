import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdosoService } from '../../../../core/service/idoso.service';
import { MedicoService } from '../../../../core/service/medico.service';
import { MedicamentoService } from '../../../../core/service/medicamento.service';
import { PrescricaoService } from '../../../../core/service/prescricao.service';
import { UserModel } from '../../../../core/models/user.model';
// O nome do seu modelo de catálogo pode variar (MedicamentoBaseModel, etc.)
import { PrescricaoMedicamentoModel } from '../../../../core/models/prescricaoMedicamento.model'; 
import { PrescricaoDTO } from '../../../../core/DTO/PrescricaoDTO';


@Component({
  selector: 'app-cad-prescricao-medica',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cad-prescrico-medica.html', // Corrigido nome do template
  styleUrl: './cad-prescrico-medica.scss',
})
export class CadPrescricoMedica implements OnInit {
  prescricaoForm!: FormGroup;
  idosos: UserModel[] = [];
  medicos: UserModel[] = [];
  medicamentos: PrescricaoMedicamentoModel[] = [];

  diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  constructor(
    private fb: FormBuilder,
    private prescricaoService: PrescricaoService,
    private idosoService: IdosoService,
    private medicoService: MedicoService,
    private medicamentoService: MedicamentoService
  ) {}

  ngOnInit(): void {
    this.prescricaoForm = this.fb.group({
      idosoId: ['', Validators.required],
      medicoId: ['', Validators.required],
      medicamentos: this.fb.array([]),
      
      // CORREÇÃO: Usando 'descricaoGeral' e 'prioridade' conforme o RecomendacaoDTO
      recomendacao: this.fb.group({
        descricaoGeral: [''],
        prioridade: ['MEDIA'],
      }),
    });

    this.loadData();
    // Adiciona um campo de medicamento inicial para facilitar
    this.addMedicamento(); 
  }
  
  // --- Funções de Carregamento ---
  loadData() {
    this.idosoService.listar().subscribe((res: UserModel[]) => (this.idosos = res));
    this.medicoService.listar().subscribe((res: UserModel[]) => (this.medicos = res));
    this.medicamentoService
      .listarTodos()
      .subscribe((res: PrescricaoMedicamentoModel[]) => (this.medicamentos = res));
  }
  
  // --- Métodos de Controle do FormArray ---
  get medicamentosArray(): FormArray {
    return this.prescricaoForm.get('medicamentos') as FormArray;
  }

  addMedicamento() {
    const medGroup = this.fb.group({
      // CORREÇÃO: Usando 'medicamentoBaseId' (chave estrangeira para o catálogo)
      medicamentoBaseId: ['', Validators.required], 
      
      dosagem: [''],
      frequenciaDiaria: [''],
      duracaoTratamento: [''],
      
      // CORREÇÃO: Usando 'observacoesPrescricao'
      observacoesPrescricao: [''], 
      
      // FormArrays vazios para dias e horários
      diasSemana: this.fb.array([]),
      horarios: this.fb.array([]),
    });
    this.medicamentosArray.push(medGroup);
  }

  removeMedicamento(index: number) {
    this.medicamentosArray.removeAt(index);
  }

  toggleDiaSemana(medIndex: number, dia: string, event: any) {
    const dias = this.medicamentosArray.at(medIndex).get('diasSemana') as FormArray;
    if (event.target.checked) {
      dias.push(this.fb.control(dia));
    } else {
      const i = dias.controls.findIndex((x) => x.value === dia);
      if (i >= 0) { // Garante que o índice existe
        dias.removeAt(i);
      }
    }
  }

  addHorario(medIndex: number, horario: string, inputElement: HTMLInputElement) {
    if (!horario) return;
    // O backend espera o formato HH:MM (ex: 18:03). O input[type="time"] já fornece isso.
    const horarios = this.medicamentosArray.at(medIndex).get('horarios') as FormArray; 
    horarios.push(this.fb.control(horario));
    inputElement.value = ''; // Limpa o input após adicionar
  }

  removeHorario(medIndex: number, horarioIndex: number) {
    const horarios = this.medicamentosArray.at(medIndex).get('horarios') as FormArray;
    horarios.removeAt(horarioIndex);
  }

  getHorarios(medIndex: number): FormArray {
    return this.medicamentosArray.at(medIndex).get('horarios') as FormArray;
  }

  // --- Função de Submissão ---
  submit() {
    if (this.prescricaoForm.valid) {
      // O valor é tipado implicitamente como PrescricaoDTO
      const payload: PrescricaoDTO = this.prescricaoForm.value; 

      this.prescricaoService.salvarPrescricao(payload).subscribe({
        next: (response) => {
          alert('Prescrição salva com sucesso!');
          this.prescricaoForm.reset();
          // Opcional: Recarregar dados ou limpar FormArray
        },
        error: (err) => {
          // Captura a mensagem de erro detalhada enviada pelo Spring (HTTP 400 Bad Request)
          const errorMessage = err.error || 'Erro desconhecido ao salvar prescrição.';
          alert(`Falha ao salvar. Detalhe: ${errorMessage}`);
          console.error('Erro detalhado:', err);
        },
      });
    } else {
      alert('Formulário inválido. Preencha todos os campos obrigatórios.');
      this.prescricaoForm.markAllAsTouched();
    }
  }
}