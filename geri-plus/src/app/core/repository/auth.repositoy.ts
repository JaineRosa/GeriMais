import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthModel } from '../models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthRepository {
  private readonly baseUrl = '';
  private readonly http = inject(HttpClient);

  login(credentials: {
    email?: string;
    senha?: string;
    nomeFamiliar?: string;
    nomeIdoso?: string;
    cpfIdoso?: string;
    platform: string;
  }): Observable<AuthModel> {
    const isFamiliarLogin =
      credentials.nomeFamiliar && credentials.nomeIdoso && credentials.cpfIdoso;

    let endpoint: string;
    let payload: any;

    if (isFamiliarLogin) {
      endpoint = '/api/auth/familiar';
      payload = {
        nomeFamiliar: credentials.nomeFamiliar,
        nomeIdoso: credentials.nomeIdoso,
        cpfIdoso: credentials.cpfIdoso,
      };
    } else {
      endpoint = '/api/auth/login';
      payload = {
        email: credentials.email,
        senha: credentials.senha,
        platform: credentials.platform,
      };
    }

    return this.http.post<AuthModel>(`${this.baseUrl}${endpoint}`, payload);
  }

  refreshToken(token: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth/refresh`, { token }) as Observable<string>;
  }

  cadastrar(usuario: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/api/usuarios`, usuario);
  }
}
