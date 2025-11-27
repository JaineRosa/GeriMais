import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/service/auth.service';
import { IdosoService } from '../../../../core/service/idoso.service';
import { ResponsavelService } from '../../../../core/service/resposavel.service';

@Component({
  selector: 'app-painel-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './painel-header.html',
  styleUrls: ['./painel-header.scss'],
})
export class PainelHeader implements OnInit {
  nomeFamiliar: string | null = null;
  fotoFamiliarUrl: string | null = null;

  nomeHospede: string | null = null;
  cpfHospede: string | null = null;

  constructor(
    private authService: AuthService,
    private idosoService: IdosoService,
    private responsavelService: ResponsavelService,
    private route: ActivatedRoute
  ) {}

 ngOnInit(): void {
    this.carregarDadosHospede();
  }

  private carregarDadosHospede(): void {
    this.route.paramMap.subscribe((params) => {
      const idosoId = params.get('id');

      if (!idosoId) return;

      this.idosoService.buscar(idosoId).subscribe({
        next: (dadosIdoso) => {
          this.nomeHospede = dadosIdoso.nome ?? 'Hóspede';
          this.cpfHospede = dadosIdoso.cpf ?? 'N/A';

          const responsavelId = dadosIdoso.responsavelId;
          if (responsavelId) {
            this.carregarResponsavel(responsavelId);
          }
        },
        error: () => {
          this.nomeHospede = 'Dados não encontrados';
          this.cpfHospede = 'N/A';
        },
      });
    });
  }

  private carregarResponsavel(responsavelId: string): void {
    const avatarPadrao = 'assets/images/idosa-avatar.png';

    this.responsavelService.buscar(responsavelId).subscribe({
      next: (resp) => {
        this.nomeFamiliar = resp.nome ?? 'Familiar';
        this.fotoFamiliarUrl = resp.fotoUrl ?? avatarPadrao;
      },
      error: () => {
        this.nomeFamiliar = 'Familiar';
        this.fotoFamiliarUrl = avatarPadrao;
      },
    });
  }
}