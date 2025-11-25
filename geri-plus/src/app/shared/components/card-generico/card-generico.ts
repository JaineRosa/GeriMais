import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-generico',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-generico.html',
  styleUrls: ['./card-generico.scss'],
  host: {
    '[class.sobre]': 'variante === "sobre"' 
  }
})
export class CardGenerico {
  @Input() titulo: string = '';
  @Input() subtitulo?: string;
  @Input() descricao?: string;
  @Input() icone?: string; 
  @Input() cor?: string; 
  @Input() tipo: string = 'default'; 
  @Input() variante: string = ''; 
}
