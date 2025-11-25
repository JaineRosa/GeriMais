import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SaudeDiariaService } from '../../../../core/service/saudeDiaria.service';
import { IdosoService } from '../../../../core/service/idoso.service';
import { CuidadorService } from '../../../../core/service/cuidador.service';

interface Pessoa {
  id: string;
  nome: string;
}

@Component({
  selector: 'app-cad-saude-diaria',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cad-saude-diaria.html',
  styleUrl: './cad-saude-diaria.scss',
})
export class CadSaudeDiaria implements OnInit {
  saudeForm!: FormGroup;
  registroId: string | null = null;
  isEditMode: boolean = false;

  
  pacientes: Pessoa[] = [];
  cuidadores: Pessoa[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    
    public router: Router,
    private saudeService: SaudeDiariaService,
    private idosoService: IdosoService,
    private cuidadorService: CuidadorService
  ) {}

  ngOnInit(): void {
    this.registroId = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!this.registroId;

    this.initForm();
    this.loadData();

    if (this.isEditMode) {
      this.loadRegistro(this.registroId!);
    }
  }

  
  initForm(): void {
    this.saudeForm = this.fb.group({
      
      idosoId: ['', Validators.required],
      cuidadorId: ['', Validators.required],

      
      humor: ['', Validators.required],
      pressaoArterialSistolica: ['', Validators.required],
      pressaoArterialDiastolica: ['', Validators.required],
      temperaturaCorporal: [null, [Validators.required, Validators.min(35), Validators.max(42)]],
      batimentosPorMinuto: [null, [Validators.required, Validators.min(30), Validators.max(200)]],
      saturacaoOxigenio: [null, [Validators.required, Validators.min(50), Validators.max(100)]],
      observacoesCuidador: [''],
      
    });
  }

  
  loadData(): void {
    
    this.idosoService.listar().subscribe((data: Pessoa[]) => {
      
      this.pacientes = data;
    });

    this.cuidadorService.listar().subscribe((data: Pessoa[]) => {
      
      this.cuidadores = data;
    });
  }

  
  loadRegistro(id: string): void {
    this.saudeService.buscarPorId(id).subscribe({
      next: (data) => {
        
        
        this.saudeForm.patchValue(data);

        
        
      },
      error: (err) => {
        console.error('Erro ao carregar registro:', err);
        alert('Erro ao carregar o registro para edição.');
      },
    });
  }

  
  submit(): void {
    
    this.saudeForm.markAllAsTouched();

    if (this.saudeForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios e válidos.');
      return;
    }

    const registroPayload = this.saudeForm.value;

    if (this.isEditMode && this.registroId) {
      
      this.saudeService.atualizarRegistro(this.registroId, registroPayload).subscribe({
        next: () => {
          alert('Registro atualizado com sucesso!');
          this.router.navigate(['/admin/saude-diaria/lista']);
        },
        error: (err) => {
          console.error('Erro na atualização:', err);
          alert('Erro ao atualizar registro. Verifique o console.');
        },
      });
    } else {
      
      this.saudeService.criarRegistro(registroPayload).subscribe({
        next: () => {
          alert('Registro cadastrado com sucesso!');
          this.router.navigate(['/admin/saude-diaria/lista']);
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
          
          alert(`Erro ao cadastrar: ${err.error?.message || 'Erro de conexão.'}`);
        },
      });
    }
  }
}
