import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';
import { PrescricaoService } from '../../../core/service/prescricao.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recomendacoes-medicas',
  standalone: true,
  imports: [CommonModule, CardGenerico],
  templateUrl: './recomendacoes-medicas.html',
  styleUrls: ['./recomendacoes-medicas.scss'],
})
export class RecomendacoesMedicas implements OnInit {
  @Input() idosoId: string | null = null;
  todasRecomendacoesGerais: any[] = [];

  constructor(private prescricaoService: PrescricaoService, private route: ActivatedRoute) {}

 ngOnInit() {
    if (this.idosoId) {
      this.carregarPrescricoes(this.idosoId);
    } else {
      console.error('ID do Idoso não fornecido via Input.');
    }
  }

  carregarPrescricoes(id: string): void {
    this.prescricaoService.getByIdoso(id).subscribe({
      next: (data) => {
        
        this.todasRecomendacoesGerais = this.processarTodasRecomendacoesGerais(data); 
      },
      error: (err) => {
        console.error('Erro ao buscar prescrições:', err);
      },
    });
  }

  processarTodasRecomendacoesGerais(data: any[]): any[] {
    if (!data || data.length === 0) {
      return [];
    }

    const recomendacoesProcessadas = data.map((recomendacao) => {
      return {
        dataRecomendacao: recomendacao.dataRecomendacao,
        descricaoGeral: recomendacao.descricaoGeral,
        prioridade: recomendacao.prioridade,
        medicoId: recomendacao.medicoId, 
      };
    });
    

    recomendacoesProcessadas.sort((a, b) => {
      const dataA = new Date(a.dataRecomendacao);
      const dataB = new Date(b.dataRecomendacao);
      return dataB.getTime() - dataA.getTime();
    });

    return recomendacoesProcessadas;
  }
}