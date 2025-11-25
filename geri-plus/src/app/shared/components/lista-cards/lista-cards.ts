import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-lista-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lista-cards.html',
  styleUrl: './lista-cards.scss',
})
export class ListaCards {
  @Input() mostrarAcoes: boolean = true; 
  @Input() titulo?: string;
  @Input() itens: any[] = [];
  @Input() camposResumo: string[] = [];
  @Input() exibirFoto: boolean = false;
  @Output() editar = new EventEmitter<any>();
  @Output() excluir = new EventEmitter<any>();
  @Output() detalhes = new EventEmitter<any>();

  onEditar(item: any) {
    this.editar.emit(item);
  }

  onExcluir(item: any) {
    this.excluir.emit(item);
  }

  onDetalhes(item: any) {
    this.detalhes.emit(item);
  }
}


