import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PrescricaoService } from '../../../core/service/prescricao.service';
import { IdosoService } from '../../../core/service/idoso.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-prescricao-medica',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: 'list-prescricao-medica.html',
  styleUrl: 'list-prescricao-medica.scss',
})
export class ListPrescricaoMedicaComponent implements OnInit {
  idosos: any[] = [];
  prescricoes: any[] = [];

  selectedIdoso: string = '';
  carregando = false;
  erro = '';

  constructor(private prescricaoService: PrescricaoService, private idosoService: IdosoService, private router: Router ) {}

  ngOnInit(): void {
    this.carregarIdosos();
  }

  carregarIdosos() {
    this.idosoService.listar().subscribe({
      next: (res) => (this.idosos = res),
      error: () => (this.erro = 'Erro ao carregar idosos'),
    });
  }

  buscarPrescricoes() {
    if (!this.selectedIdoso) {
      this.erro = 'Selecione um idoso';
      return;
    }

    this.erro = '';
    this.carregando = true;

    this.prescricaoService.getByIdoso(this.selectedIdoso).subscribe({
      next: (res) => {
        
        this.prescricoes = res.map((p: any) => ({
          ...p,
          medicamentosPrescritos: p.medicamentosPrescritos?.map((m: any) => ({
            ...m,
            horarios: m.horarios?.map((h: any) =>
              typeof h === 'string' ? h.substring(0, 5) : h.toString().substring(0, 5)
            ),
          })),
        }));

        this.carregando = false;
      },
      error: () => {
        this.erro = 'Erro ao buscar prescrições';
        this.carregando = false;
      },
    });
  }

  editar(prescricaoId: string) {
    this.router.navigate([`/admin/prescricoes/editar/${prescricaoId}`]);
  }
}
