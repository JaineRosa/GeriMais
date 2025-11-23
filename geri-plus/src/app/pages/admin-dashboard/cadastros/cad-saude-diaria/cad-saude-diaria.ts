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

  // Listas para os selects
  pacientes: Pessoa[] = [];
  cuidadores: Pessoa[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    // CORREÇÃO: Mude para 'public' para acesso no template
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

  // 1. Inicializa o formulário com TODOS os campos e validações
  initForm(): void {
    this.saudeForm = this.fb.group({
      // CAMPOS DE SELEÇÃO OBRIGATÓRIOS
      idosoId: ['', Validators.required],
      cuidadorId: ['', Validators.required],

      // Campos de registro (Baseados no seu Model SaudeDiaria)
      humor: ['', Validators.required],
      pressaoArterialSistolica: ['', Validators.required],
      pressaoArterialDiastolica: ['', Validators.required],
      temperaturaCorporal: [null, [Validators.required, Validators.min(35), Validators.max(42)]],
      batimentosPorMinuto: [null, [Validators.required, Validators.min(30), Validators.max(200)]],
      saturacaoOxigenio: [null, [Validators.required, Validators.min(50), Validators.max(100)]],
      observacoesCuidador: [''],
      // dataHoraRegistro e id não são incluídos, pois são gerados ou parte da rota
    });
  }

  // 2. Carrega Pacientes e Cuidadores
  loadData(): void {
    // Exemplo: Substitua `listar` pelo método correto do seu serviço
    this.idosoService.listar().subscribe((data: Pessoa[]) => {
      // Assumindo que o listar retorna { id: string, nome: string }
      this.pacientes = data;
    });

    this.cuidadorService.listar().subscribe((data: Pessoa[]) => {
      // Assumindo que o listar retorna { id: string, nome: string }
      this.cuidadores = data;
    });
  }

  // 3. Carrega o registro para edição (PatchValue)
  loadRegistro(id: string): void {
    this.saudeService.buscarPorId(id).subscribe({
      next: (data) => {
        // Usa patchValue para preencher o formulário
        // O backend deve retornar os campos com os IDs corretos (idosoId, cuidadorId)
        this.saudeForm.patchValue(data);

        // Se a API retornar um nome de campo diferente (ex: idosoId) do que está no form,
        // use: this.saudeForm.get('idosoId')?.setValue(data.idosoId);
      },
      error: (err) => {
        console.error('Erro ao carregar registro:', err);
        alert('Erro ao carregar o registro para edição.');
      },
    });
  }

  // 4. Envio do Formulário
  submit(): void {
    // Garante que o usuário veja as validações
    this.saudeForm.markAllAsTouched();

    if (this.saudeForm.invalid) {
      alert('Por favor, preencha todos os campos obrigatórios e válidos.');
      return;
    }

    const registroPayload = this.saudeForm.value;

    if (this.isEditMode && this.registroId) {
      // EDIÇÃO (PUT)
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
      // CADASTRO (POST)
      this.saudeService.criarRegistro(registroPayload).subscribe({
        next: () => {
          alert('Registro cadastrado com sucesso!');
          this.router.navigate(['/admin/saude-diaria/lista']);
        },
        error: (err) => {
          console.error('Erro no cadastro:', err);
          // O backend retorna a mensagem de erro no `err.error`
          alert(`Erro ao cadastrar: ${err.error?.message || 'Erro de conexão.'}`);
        },
      });
    }
  }
}
