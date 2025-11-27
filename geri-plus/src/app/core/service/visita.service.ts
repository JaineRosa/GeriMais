import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Visita } from "../models/visita.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class VisitaService {
  private baseUrl = '/api/visitas'; 

  constructor(private http: HttpClient) {}

  listar(): Observable<Visita[]> {
    return this.http.get<Visita[]>(this.baseUrl);
  }

  listarPorIdoso(idosoId: string): Observable<Visita[]> {
    return this.http.get<Visita[]>(`${this.baseUrl}/idoso/${idosoId}`);
  }

  criar(visita: Visita): Observable<Visita> {
    return this.http.post<Visita>(this.baseUrl, visita);
  }

  atualizar(id: string, visita: Partial<Visita>): Observable<Visita> {
    return this.http.put<Visita>(`${this.baseUrl}/${id}`, visita);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}