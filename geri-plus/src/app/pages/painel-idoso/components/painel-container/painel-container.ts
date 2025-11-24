import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DadosGerais } from '../../dados-gerais/dados-gerais';
import { Medicamentos } from '../../medicamentos/medicamentos';
import { Cuidadores } from '../../cuidadores/cuidadores';
import { RecomendacoesMedicas } from '../../recomendacoes-medicas/recomendacoes-medicas';
import { Notificacoes } from '../../notificacoes/notificacoes';
import { PainelHeader } from '../painel-header/painel-header';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-painel-container',
  standalone: true,
  imports: [
    CommonModule,
    DadosGerais,
    Medicamentos,
    Cuidadores,
    RecomendacoesMedicas,
    Notificacoes,
    PainelHeader,
  ],
  templateUrl: './painel-container.html',
  styleUrls: ['./painel-container.scss'],
})
export class PainelContainer {
  // 🔹 Recebe os dados do PainelIdoso
  @Input() nomeFamiliar!: string;
  @Input() nomeHospede!: string;
  @Input() cpfHospede!: string;

  abaSelecionada: string = 'dados-gerais';

  idosoMongoId: string | null = null;

  selecionarAba(aba: string) {
    this.abaSelecionada = aba;
  }

   constructor(private route: ActivatedRoute) {} 

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.idosoMongoId = params.get('id');
      console.log("ID do Idoso (Mongo) lido da URL:", this.idosoMongoId);
    });
  }
}
