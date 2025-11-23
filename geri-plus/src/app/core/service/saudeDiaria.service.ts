// src/app/core/service/saude-diaria.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// Defina uma interface para o modelo SaudeDiaria
// Você precisará criar este modelo ou DTO, por exemplo:
// export interface SaudeDiaria { ... todos os campos ... }

const API_URL = '/api/saude-diaria'; 

@Injectable({
  providedIn: 'root',
})
export class SaudeDiariaService {
  constructor(private http: HttpClient) {}

  // 🔹 CADASTRAR / CRIAR (POST)
  criarRegistro(registro: any): Observable<any> {
    return this.http.post(API_URL, registro);
  }

  atualizarRegistro(id: string, registro: any): Observable<any> {
    return this.http.put(`${API_URL}/${id}`, registro); 
  }

  listarPorIdoso(idosoId: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/idoso/${idosoId}`);
  }

  buscarPorId(id: string): Observable<any> {
    return this.http.get<any>(`${API_URL}/${id}`);
  }

  deletarRegistro(id: string): Observable<any> {
    return this.http.delete(`${API_URL}/${id}`);
  }

 listarTodos(): Observable<any[]> {
    // Chama o endpoint base que deve retornar todos os registros (GET /api/saude-diaria)
    return this.http.get<any[]>(API_URL);
  }
}