import { Component, Input, OnInit } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrescricaoService } from '../../../core/service/prescricao.service';

@Component({
  selector: 'app-medicamentos',
  standalone: true,
  imports: [CardGenerico, CommonModule, FormsModule],
  templateUrl: './medicamentos.html',
  styleUrls: ['./medicamentos.scss'],
})
export class Medicamentos {
  private _idosoId: string | null = null;

  medicamentosDoIdoso: any[] = [];
  selectedTipoPrescricao: string = '';

  carregando = false;
  erro = '';

  constructor(private prescricaoService: PrescricaoService) {}

  @Input()
  set idosoId(id: string | null) {
    this._idosoId = id;
    if (id) {
      this.carregarMedicamentos(id);
    } else {
      this.medicamentosDoIdoso = [];
    }
  }
  get idosoId() {
    return this._idosoId;
  }

  private carregarMedicamentos(id: string) {
    this.carregando = true;
    this.erro = '';
    console.log('[Medicamentos] carregando prescrições para idosoId=', id);

    this.prescricaoService.getByIdoso(id).subscribe({
      next: (prescricoes: any[]) => {
        console.log('[Medicamentos] resposta getByIdoso:', prescricoes);
        this.medicamentosDoIdoso = this.processarMedicamentos(prescricoes);
        this.carregando = false;
      },
      error: (err) => {
        console.error('[Medicamentos] erro ao buscar prescrições:', err);
        this.erro = 'Erro ao carregar medicamentos';
        this.carregando = false;
      },
    });
  }

  private processarMedicamentos(prescricoes: any[]): any[] {
    if (!prescricoes || prescricoes.length === 0) return [];

    const meds: any[] = [];

    prescricoes.forEach((p) => {
      const itens = p.itensPrescritos ?? p.medicamentosPrescritos ?? [];
      if (!Array.isArray(itens)) return;
      const dataPrescricao = p.dataRecomendacao ?? p.dataPrescricao ?? p.createdAt ?? null;
      itens.forEach((item: any) => {
        meds.push({
          nome: item.nomeMedicamento ?? item.nome ?? item.nome_remedio ?? '—',
          dosagem: item.dosagem ?? item.dose ?? '—',
          frequenciaDiaria: item.frequenciaDiaria ?? item.frequencia ?? '—',
          duracaoTratamento: item.duracaoTratamento ?? item.duracao ?? '—',
          viaAdministracao: item.viaAdministracao ?? item.via ?? '—',
          observacoes: item.observacoesPrescricao ?? item.observacoes ?? '',

          horarios: (item.horarios ?? []).map((h: any) =>
            typeof h === 'string' ? h.substring(0, 5) : String(h).substring(0, 5)
          ),
          diasSemana: item.diasSemana ?? [],
          status: item.status ?? null,
          novo: item.status === 'NOVO',

          dataPrescricao: dataPrescricao,
        });
      });
    });

    const unique = meds.reduce((acc: any[], cur) => {
      const exists = acc.find((m) => m.nome === cur.nome && m.dosagem === cur.dosagem);
      if (!exists) acc.push(cur);
      return acc;
    }, []);

    unique.sort((a, b) => {
      const da = a.dataPrescricao ? new Date(a.dataPrescricao).getTime() : 0;
      const db = b.dataPrescricao ? new Date(b.dataPrescricao).getTime() : 0;
      return db - da;
    });

    return unique;
  }

  imprimirPrescricao() {
    const filtrados =
      this.selectedTipoPrescricao === 'novos'
        ? this.medicamentosDoIdoso.filter((m) => m.novo)
        : this.medicamentosDoIdoso.filter((m) => !m.novo);

    if (!filtrados.length) {
      alert('Nenhum medicamento encontrado para esta opção.');
      return;
    }

    alert(
      `Imprimindo ${filtrados.length} medicamento(s): ${filtrados.map((m) => m.nome).join(', ')}`
    );
  }

  definirBadge(med: any): string {
    if (med.novo) return 'Novo';
    return 'Em uso';
  }

  definirBadgeTipo(med: any): string {
    if (med.novo) return 'success';
    return 'info';
  }
}
