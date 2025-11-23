import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrescricaoDTO } from '../DTO/PrescricaoDTO';
import { RecomendacaoMedicaModel } from '../models/recomendacao.model';

@Injectable({
  providedIn: 'root',
})
export class PrescricaoService {
  private apiUrl = '/api/prescricao';

  constructor(private http: HttpClient) {}

  salvarPrescricao(data: PrescricaoDTO): Observable<RecomendacaoMedicaModel> {
    return this.http.post<RecomendacaoMedicaModel>(`${this.apiUrl}/salvar`, data);
  }

  getByIdoso(idosoId: string) {
    return this.http.get<any[]>(`${this.apiUrl}/idoso/${idosoId}`);
  }

  buscarPrescricaoPorId(id: string): Observable<RecomendacaoMedicaModel> {
    return this.http.get<RecomendacaoMedicaModel>(`${this.apiUrl}/${id}`);
  }
  update(id: string, data: PrescricaoDTO) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  getById(id: string) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }
}
