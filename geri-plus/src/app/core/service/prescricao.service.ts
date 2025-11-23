import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PrescricaoDTO } from '../DTO/PrescricaoDTO';
import { RecomendacaoMedicaModel } from '../models/recomendacao.model';

@Injectable({
  providedIn: 'root'
})
export class PrescricaoService {

  private apiUrl = '/api/prescricao'; 

  constructor(private http: HttpClient) { }

 salvarPrescricao(data: PrescricaoDTO): Observable<RecomendacaoMedicaModel> {
    return this.http.post<RecomendacaoMedicaModel>(`${this.apiUrl}/salvar`, data);
  }

  buscarPrescricaoPorIdoso(idosoId: string): Observable<RecomendacaoMedicaModel[]> {
    return this.http.get<RecomendacaoMedicaModel[]>(`${this.apiUrl}/idoso/${idosoId}`);
  }
}
