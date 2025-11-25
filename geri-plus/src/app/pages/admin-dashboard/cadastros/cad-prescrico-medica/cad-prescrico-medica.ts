import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormArray,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { IdosoService } from '../../../../core/service/idoso.service';
import { MedicoService } from '../../../../core/service/medico.service';
import { MedicamentoService } from '../../../../core/service/medicamento.service';
import { PrescricaoService } from '../../../../core/service/prescricao.service';

import { UserModel } from '../../../../core/models/user.model';
import { PrescricaoMedicamentoModel } from '../../../../core/models/prescricaoMedicamento.model';
import { PrescricaoDTO } from '../../../../core/DTO/PrescricaoDTO';

@Component({
  selector: 'app-cad-prescricao-medica',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cad-prescrico-medica.html',
  styleUrl: './cad-prescrico-medica.scss',
})
export class CadPrescricoMedica implements OnInit {
  prescricaoForm!: FormGroup;

  idosos: UserModel[] = [];
  medicos: UserModel[] = [];
  medicamentos: PrescricaoMedicamentoModel[] = [];

  diasSemana = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  prescricaoId: string | null = null; 

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private prescricaoService: PrescricaoService,
    private idosoService: IdosoService,
    private medicoService: MedicoService,
    private medicamentoService: MedicamentoService
  ) {} 

  ngOnInit(): void {
    this.prescricaoId = this.route.snapshot.paramMap.get('id');

    this.prescricaoForm = this.fb.group({
      idosoId: ['', Validators.required],
      medicoId: ['', Validators.required],
      medicamentos: this.fb.array([]),
      dataRecomendacao: [''],
      recomendacao: this.fb.group({
        descricaoGeral: [''],
        prioridade: ['NORMAL'],
      }),
    });

    this.loadData();

    if (this.prescricaoId) {
      this.loadPrescricao(this.prescricaoId);
    } else {
      this.addMedicamento();
    }
  } 

  loadData() {
    this.idosoService.listar().subscribe((res) => (this.idosos = res));
    this.medicoService.listar().subscribe((res) => (this.medicos = res));
    this.medicamentoService.listarTodos().subscribe((res) => (this.medicamentos = res));
  } 

  loadPrescricao(id: string) {
    this.prescricaoService.getById(id).subscribe((data: any) => {
      console.log('DADOS RECEBIDOS DA API:', data);

      this.prescricaoForm.patchValue({
        idosoId: data.idosoId,
        medicoId: data.medicoId, 
        recomendacao: {
          descricaoGeral: data.descricaoGeral,
          prioridade: data.prioridade,
        },
      }); 

      this.medicamentosArray.clear(); 

      data.medicamentosPrescritos.forEach((m: any) => {
        
        const diasArray = this.fb.array(m.diasSemana || []); 

        const horariosArray = this.fb.array(
          (m.horarios || []).map((h: string) => h.substring(0, 5))
        );

        const mg = this.fb.group({
          medicamentoBaseId: [m.medicamentoBaseId, Validators.required],
          dosagem: [m.dosagem],
          frequenciaDiaria: [m.frequenciaDiaria],
          duracaoTratamento: [m.duracaoTratamento],
          observacoesPrescricao: [m.observacoesPrescricao],
          diasSemana: diasArray,
          horarios: horariosArray,
        });

        this.medicamentosArray.push(mg);
      });
    });
  } 

  get medicamentosArray(): FormArray {
    return this.prescricaoForm.get('medicamentos') as FormArray;
  }

  addMedicamento() {
    const medGroup = this.fb.group({
      medicamentoBaseId: ['', Validators.required],
      dosagem: [''],
      frequenciaDiaria: [''],
      duracaoTratamento: [''],
      observacoesPrescricao: [''],
      diasSemana: this.fb.array([]),
      horarios: this.fb.array([]),
    });
    this.medicamentosArray.push(medGroup);
  }

  removeMedicamento(i: number) {
    this.medicamentosArray.removeAt(i);
  } 

  toggleDiaSemana(index: number, dia: string, event: any) {
    const dias = this.medicamentosArray.at(index).get('diasSemana') as FormArray;
    if (event.target.checked) {
      dias.push(this.fb.control(dia));
    } else {
      const idx = dias.controls.findIndex((x) => x.value === dia);
      if (idx >= 0) dias.removeAt(idx);
    }
  } 

  addHorario(i: number, horario: string, input: any) {
    if (!horario) return;
    const horarios = this.medicamentosArray.at(i).get('horarios') as FormArray;
    horarios.push(this.fb.control(horario));
    input.value = '';
  }

  removeHorario(i: number, hi: number) {
    const horarios = this.medicamentosArray.at(i).get('horarios') as FormArray;
    horarios.removeAt(hi);
  }

  getHorarios(i: number): FormArray {
    return this.medicamentosArray.at(i).get('horarios') as FormArray;
  } 

  submit() {
    const payload: PrescricaoDTO = this.prescricaoForm.value;

    if (this.prescricaoId) {
      this.prescricaoService.update(this.prescricaoId, payload).subscribe(
        () => {
          alert('Prescrição atualizada com sucesso!');
          this.router.navigate(['admin/lista-prescricoes']);
        },
        (error) => {
          console.error('Erro ao atualizar prescrição:', error);
          alert('Erro ao atualizar prescrição. Verifique o console.');
        }
      );
    } else {
      payload.dataRecomendacao = new Date().toISOString();
      this.prescricaoService.salvarPrescricao(payload).subscribe(
        () => {
          this.router.navigate(['/admin/lista-prescricoes']).then(() => {
            alert('Prescrição cadastrada com sucesso!');
          });
        },
        (error) => {
          
          console.error('Erro ao cadastrar prescrição:', error);
          alert('Erro ao cadastrar prescrição. Verifique o console.');
        }
      );
    }
  }
}
