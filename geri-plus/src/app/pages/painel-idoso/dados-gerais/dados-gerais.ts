import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CardGenerico } from '../../../shared/components/card-generico/card-generico';
import { IdosoService } from '../../../core/service/idoso.service';
import { UserModel } from '../../../core/models/user.model';
import { PrescricaoService } from '../../../core/service/prescricao.service';

interface Notificacao {
  titulo: string;
  data: string;
  mensagem: string;
  tipo?: string;
}

@Component({
  selector: 'app-dados-gerais',
  standalone: true,
  imports: [CommonModule, CardGenerico],
  templateUrl: './dados-gerais.html',
  styleUrls: ['./dados-gerais.scss'],
})
export class DadosGerais implements OnInit {
  @Input() idosoId: string | null = null;
  @Input() nomeFamiliar: string | null = null;
  @Input() nomeHospede: string | null = null;
  @Input() cpfHospede: string | null = null;

  dadosIdoso: UserModel | null = null;

  ultimosDoisMedicamentos: string = '';
  ultimaRecomendacao: string = '';
  notificacoes: Notificacao[] = [];

  constructor(private idosoService: IdosoService, private prescricaoService: PrescricaoService) {}

  ngOnInit(): void {
    if (!this.idosoId) {
      console.error('❌ idosoId não foi informado ao componente.');
      return;
    }
    this.carregarIdoso(this.idosoId);
    this.carregarResumosPrescricao(this.idosoId);
    this.carregarNotificacoesMock();
  }

  carregarIdoso(id: string) {
    this.idosoService.buscar(id).subscribe((res) => {
      this.dadosIdoso = res;
    });
  }

  carregarResumosPrescricao(id: string) {
    this.prescricaoService.getByIdoso(id).subscribe((prescricoes: any[]) => {
      if (!prescricoes || prescricoes.length === 0) {
        this.ultimosDoisMedicamentos = 'Nenhum medicamento cadastrado';
        this.ultimaRecomendacao = 'Nenhuma recomendação médica cadastrada';
        return;
      } 

      const todosMedicamentos = this.extrairETrazerTodosMedicamentos(prescricoes); 
      const todasRecomendacoes = this.extrairETrazerTodasRecomendacoes(prescricoes); 

      if (todosMedicamentos.length > 0) {
        const medicamentosOrdenados = this.ordenarPorDataDecrescente(todosMedicamentos);
        const ultimos = medicamentosOrdenados.slice(0, 2);
        this.ultimosDoisMedicamentos = ultimos
          .map((m: any) => {
            const nome = m.nomeMedicamento ?? m.nome ?? 'Medicamento sem nome';
            const dosagem = m.dosagem ?? m.dose ?? 'N/A';
            return `${nome} (${dosagem})`;
          })
          .join(' | ');
      } else {
        this.ultimosDoisMedicamentos = 'Nenhum medicamento cadastrado';
      }

      if (todasRecomendacoes.length > 0) {
        const recomendacoesOrdenadas = this.ordenarPorDataDecrescente(todasRecomendacoes);
        const ultima = recomendacoesOrdenadas[0];
        this.ultimaRecomendacao =
          ultima.descricaoGeral ?? ultima.descricao ?? ultima.titulo ?? 'Detalhe não encontrado.';
      } else {
        this.ultimaRecomendacao = 'Nenhuma recomendação médica cadastrada';
      }
    });
  }

  private extrairETrazerTodosMedicamentos(prescricoes: any[]): any[] {
    const meds: any[] = [];
    prescricoes.forEach((p) => {
      const itens = p.itensPrescritos ?? p.medicamentosPrescritos ?? [];
      const dataPrescricao = p.dataRecomendacao ?? p.dataPrescricao ?? p.createdAt ?? null;
      if (Array.isArray(itens)) {
        itens.forEach((item: any) => {
          meds.push({
            ...item,
            dataPrescricao: dataPrescricao,
            nome: item.nomeMedicamento ?? item.nome ?? '—',
            dosagem: item.dosagem ?? item.dose ?? '—',
          });
        });
      }
    }); 
    return meds;
  }

  private extrairETrazerTodasRecomendacoes(prescricoes: any[]): any[] {
    return prescricoes
      .filter((p) => p.descricaoGeral || p.titulo)
      .map((p) => ({
        dataRecomendacao: p.dataRecomendacao,
        descricaoGeral: p.descricaoGeral,
        titulo: p.titulo,
      }));
  }

  private ordenarPorDataDecrescente(lista: any[]): any[] {
    const listaCopia = [...lista];
    listaCopia.sort((a, b) => {
      const dataAString = a.dataPrescricao || a.dataRecomendacao || a.createdAt || null;
      const dataBString = b.dataPrescricao || b.dataRecomendacao || b.createdAt || null;

      const dataA = dataAString ? new Date(dataAString).getTime() : 0;
      const dataB = dataBString ? new Date(dataBString).getTime() : 0; 

      return dataB - dataA;
    });
    return listaCopia;
  }

  private carregarNotificacoesMock(): void {
    this.notificacoes = [
      {
        titulo: 'Pressão arterial monitorada',
        data: '21/11/2025 - 16:45',
        mensagem: 'O residente apresentou leve alteração de pressão arterial.',
        tipo: 'warning',
      },
      {
        titulo: 'Medicamento administrado',
        data: '21/11/2025 - 10:30',
        mensagem: 'Losartana administrada conforme prescrição.',
        tipo: 'success',
      },
    ];
  }
}
