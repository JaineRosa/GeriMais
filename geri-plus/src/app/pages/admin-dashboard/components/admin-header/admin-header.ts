import { CommonModule } from '@angular/common';
import { Component, Input, EventEmitter, Output} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-header.html',
  styleUrls: ['./admin-header.scss']
})
export class AdminHeader {
  @Input() menuAberto: boolean = true;
  @Output() menuToggle = new EventEmitter<void>();

  userName: string = 'Administrador';


}
