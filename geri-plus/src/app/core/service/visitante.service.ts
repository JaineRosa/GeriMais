import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRepository } from '../repository/user.repository';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class VisitanteService {
  constructor(private userRepo: UserRepository) {}

  listar(): Observable<UserModel[]> {
    
    return this.userRepo.getByType('VISITANTE');
  }

  buscar(id: string): Observable<UserModel> {
    return this.userRepo.getById(id);
  }

  criar(visitante: UserModel): Observable<UserModel> {
    visitante.tipoUsuario = 'VISITANTE'; 
    return this.userRepo.post(visitante);
  }

  atualizar(id: string, visitante: UserModel): Observable<UserModel> {
    visitante.tipoUsuario = 'VISITANTE';
    return this.userRepo.put(id, visitante);
  }

  excluir(id: string): Observable<void> {
    return this.userRepo.delete(id);
  }
}
