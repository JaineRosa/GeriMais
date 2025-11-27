import { Component, Input, OnInit } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';
import { CommonModule } from '@angular/common';
import { UserModel } from '../../../core/models/user.model';
import { CuidadorService } from '../../../core/service/cuidador.service';
import { IdosoService } from '../../../core/service/idoso.service';

@Component({
  selector: 'app-cuidadores',
  standalone: true,
  imports: [CommonModule, CardGenerico],
  templateUrl: './cuidadores.html',
  styleUrls: ['./cuidadores.scss'],
})
export class Cuidadores implements OnInit {
  @Input() idosoId: string | null = null;

  listaCuidadores: UserModel[] = [];
  cuidadoresHistorico: any[] = [];

  constructor(private cuidadorService: CuidadorService) {}

  ngOnInit() {
    if (!this.idosoId) return;
    this.carregarCuidadores(this.idosoId);
  }

  private carregarCuidadores(idosoId: string) {
    this.cuidadorService.listar().subscribe({
      next: (cuidadores: UserModel[]) => {
        this.listaCuidadores = cuidadores.filter(
          (c) => c.idososId?.includes(idosoId) && c.statusResidencia === 'ATIVO'
        );

        this.cuidadoresHistorico = cuidadores
          .filter((c) => c.idososId?.includes(idosoId) && c.statusResidencia !== 'ATIVO')
          .map((c) => ({
            nome: c.nome,
          }));
      },
      error: (err) => {
        console.error('Erro ao buscar cuidadores:', err);
      },
    });
  }
}
