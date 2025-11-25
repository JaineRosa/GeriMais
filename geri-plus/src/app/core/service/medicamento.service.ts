import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrescricaoMedicamentoModel } from '../models/prescricaoMedicamento.model';

@Injectable({
  providedIn: 'root',
})
export class MedicamentoService {
  
  private apiUrl = '/api/medicamentos';
  constructor(private http: HttpClient) {}

   
  listarTodos(): Observable<PrescricaoMedicamentoModel[]> {
    return this.http.get<PrescricaoMedicamentoModel[]>(`${this.apiUrl}`);
  }

  criar(medicamento: MedicamentoModel): Observable<MedicamentoModel> {
    return this.http.post<MedicamentoModel>(this.apiUrl, medicamento);
  }

   atualizar(id: string, medicamento: MedicamentoModel): Observable<MedicamentoModel> {
    return this.http.put<MedicamentoModel>(`${this.apiUrl}/${id}`, medicamento);
  }

  excluir(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  listarPorIdoso(idosoId: string): Observable<PrescricaoMedicamentoModel[]> {
    return this.http.get<PrescricaoMedicamentoModel[]>(`${this.apiUrl}/idoso/${idosoId}`);
  }
}