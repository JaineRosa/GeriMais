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

  // 🔹 Controle: se true, usa MOCK; se false, chama backend real
  private readonly USE_MOCK = false;

  /**
   * Faz login do usuário
   * @param credentials { email, password, platform }
   */
  login(credentials: {
    email?: string; // usado só para ADMIN
    senha?: string; // usado só para ADMIN
    nomeFamiliar?: string; // usado para FAMILIAR
    nomeIdoso?: string; // usado para FAMILIAR
    cpfIdoso?: string; // usado para FAMILIAR
    platform: string;
  }): Observable<AuthModel> {
    if (this.USE_MOCK) {
      // 🔹 Decide perfil conforme campos enviados
      let tipoUsuario = 'ADMIN';
      if (credentials.nomeFamiliar && credentials.nomeIdoso && credentials.cpfIdoso) {
        tipoUsuario = 'FAMILIAR';
      }

      const mock: AuthModel = {
        token: 'mock-token-123',
        expiresIn: 3600,
        user: {
          id: '1',
          nome:
            tipoUsuario === 'ADMIN' ? 'Admin Mock' : credentials.nomeFamiliar || 'Familiar Mock',
          email: credentials.email || '',
          cpf: credentials.cpfIdoso || '',
          tipoUsuario: tipoUsuario,
          quarto: '12A',
          telefone: '99999-9999',
          dataNascimento: '1950-05-10',
          responsavelId: 'resp001',
          statusResidencia: 'ATIVO',
          notificacoesNaoLidas: [],
          medicamentos: [],
          recomendacoesMedicas: [],
          cuidadoresId: [],
        },
      };

      return of(mock).pipe(delay(500));
    }

    // 🔹 Backend real (quando pronto)
    return this.http.post<AuthModel>(`${this.baseUrl}/api/auth/login`, credentials);
  }

  /**
   * Atualiza token de acesso
   * @param token string
   */
  refreshToken(token: string): Observable<string> {
    return this.http.post(`${this.baseUrl}/auth/refresh`, { token }) as Observable<string>;
  }

  /**
   * Cadastra novo usuário
   * @param usuario objeto com dados do usuário
   */
  cadastrar(usuario: any): Observable<any> {
    if (this.USE_MOCK) {
      // Mock simples — retorna o usuário com ID fake
      const mock = {
        ...usuario,
        id: 'mock-id-123',
        createdAt: new Date(),
      };

      return of(mock).pipe(delay(500));
    }

    // 🔹 Backend real (quando pronto)
    return this.http.post<any>(`${this.baseUrl}/api/usuarios`, usuario);
  }
}
