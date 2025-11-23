import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SaudeDiariaService } from '../../../core/service/saudeDiaria.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IdosoService } from '../../../core/service/idoso.service';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CuidadorService } from '../../../core/service/cuidador.service';
interface Pessoa {
    id: string;
    nome: string; 
}
@Component({
  selector: 'app-list-saude-diaria',
standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './list-saude-diaria.html',
  styleUrl: './list-saude-diaria.scss',
})
export class ListSaudeDiaria   implements OnInit {

  registros: any[] = [];
  pacientes: Pessoa[] = []; // Lista para o filtro e mapeamento de nomes
  cuidadores: Pessoa[] = []; // Lista para mapeamento de nomes
  loading: boolean = true;
  
  pacienteSelecionadoId: string = ''; 

  constructor(
    private saudeService: SaudeDiariaService,
    private idosoService: IdosoService, 
    private cuidadorService: CuidadorService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarDadosIniciais();
  }

  carregarDadosIniciais(): void {
      this.carregarPacientesECuidadores(); // Carrega as listas de nomes
      this.carregarRegistros(); // Carrega os registros
  }
  
  carregarPacientesECuidadores(): void {
      // Carrega Pacientes
      this.idosoService.listar().subscribe({
          next: (data: Pessoa[]) => {
              this.pacientes = data; 
          },
          error: (err) => {
              console.error('ERRO ao carregar pacientes:', err);
          }
      });
      // Carrega Cuidadores
      this.cuidadorService.listar().subscribe({
          next: (data: Pessoa[]) => {
              this.cuidadores = data; 
          },
          error: (err) => {
              console.error('ERRO ao carregar cuidadores:', err);
          }
      });
  }

  carregarRegistros(): void {
    this.loading = true;
    
    this.saudeService.listarTodos().subscribe({
      next: (data) => {
        this.registros = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar os registros:', err);
        this.loading = false;
      }
    });
  }
  
  // 🌟 NOVO MÉTODO: TRADUÇÃO DE ID PARA NOME 🌟
  getNomeById(id: string, lista: Pessoa[]): string {
    if (!id || !lista) return 'N/A';
    const item = lista.find(p => p.id === id);
    return item ? item.nome : 'N/A';
  }

  // Lógica de Filtragem no Front-end (usa o array 'registros')
  get registrosFiltrados(): any[] {
    if (!this.pacienteSelecionadoId) {
      return this.registros; 
    }
    return this.registros.filter(reg => reg.idosoId === this.pacienteSelecionadoId);
  }

  aplicarFiltro(): void {
      // O getter 'registrosFiltrados' atualiza a lista automaticamente.
  }

  editarRegistro(id: string): void {
    this.router.navigate(['/admin/saude-diaria/cadastrar', id]);
  }

  excluirRegistro(id: string): void {
    if (confirm('Tem certeza que deseja excluir este registro de saúde diária?')) {
      this.saudeService.deletarRegistro(id).subscribe({
        next: () => {
          alert('Registro excluído com sucesso.');
          this.carregarRegistros(); 
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);
          alert('Erro ao excluir registro.');
        }
      });
    }
  }
}
