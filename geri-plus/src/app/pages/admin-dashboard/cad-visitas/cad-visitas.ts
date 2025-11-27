import { Component, OnInit } from '@angular/core';
import { Visita } from '../../../core/models/visita.model';
import { VisitaService } from '../../../core/service/visita.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError, forkJoin, map, of } from 'rxjs';
import { UserModel } from '../../../core/models/user.model';
import { IdosoService } from '../../../core/service/idoso.service';
import { CuidadorService } from '../../../core/service/cuidador.service';
import { VisitanteService } from '../../../core/service/visitante.service';

@Component({
  selector: 'app-cad-visitas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cad-visitas.html',
  styleUrl: './cad-visitas.scss',
})
export class CadVisitas implements OnInit {
  visitas: (Visita & { nomeIdoso?: string; nomeCuidador?: string; nomeVisitante?: string })[] = [];
  visitaSelecionada: Visita | null = null;

  listaIdosos: UserModel[] = [];
  listaCuidadores: UserModel[] = [];
  listaVisitantes: UserModel[] = [];

  constructor(
    private visitaService: VisitaService,
    private idosoService: IdosoService,
    private cuidadorService: CuidadorService,
    private visitanteService: VisitanteService
  ) {}

  ngOnInit(): void {
    this.carregarUsuarios();
    this.carregarVisitas();
  }

  carregarUsuarios() {
    this.idosoService.listar().subscribe((res) => (this.listaIdosos = res));
    this.cuidadorService.listar().subscribe((res) => (this.listaCuidadores = res));
    this.visitanteService.listar().subscribe((res) => (this.listaVisitantes = res));
  }

  carregarVisitas() {
    this.visitaService.listar().subscribe((res) => {
      const requests = res.map((v) => {
        const idoso$ = v.idosoId
          ? this.idosoService.buscar(v.idosoId).pipe(catchError(() => of({ nome: '-' })))
          : of({ nome: '-' });
        const cuidador$ = v.cuidadorId
          ? this.cuidadorService.buscar(v.cuidadorId).pipe(catchError(() => of({ nome: '-' })))
          : of({ nome: '-' });
        const visitante$ = v.visitanteId
          ? this.visitanteService.buscar(v.visitanteId).pipe(catchError(() => of({ nome: '-' })))
          : of({ nome: '-' });

        return forkJoin({ idoso: idoso$, cuidador: cuidador$, visitante: visitante$ }).pipe(
          catchError(() =>
            of({ idoso: { nome: '-' }, cuidador: { nome: '-' }, visitante: { nome: '-' } })
          ),
          map(({ idoso, cuidador, visitante }) => ({
            ...v,
            nomeIdoso: idoso.nome,
            nomeCuidador: cuidador.nome,
            nomeVisitante: visitante.nome,
          }))
        );
      });

      if (requests.length > 0) {
        forkJoin(requests).subscribe((visitasComNomes) => (this.visitas = visitasComNomes));
      } else {
        this.visitas = [];
      }
    });
  }

  novaVisita() {
    this.visitaSelecionada = {
      id: '',
      idosoId: '',
      cuidadorId: '',
      visitanteId: '',
      dataHoraVisita: new Date().toISOString(),
      statusVisita: 'AGENDADA',
      observacoes: '',
    };
  }

  selecionarVisita(visita: Visita) {
    this.visitaSelecionada = { ...visita };
  }

  salvarVisita() {
    if (!this.visitaSelecionada) return;

    if (this.visitaSelecionada.id) {
      this.visitaService
        .atualizar(this.visitaSelecionada.id, this.visitaSelecionada)
        .subscribe(() => this.carregarVisitas());
    } else {
      this.visitaService.criar(this.visitaSelecionada).subscribe(() => this.carregarVisitas());
      alert('Visita criada com sucesso! Enviando notificações ao Resposável pelo Idoso.');
    }

    this.visitaSelecionada = null;
  }

  deletarVisita(id: string) {
    this.visitaService.deletar(id).subscribe(() => this.carregarVisitas());
  }
}
