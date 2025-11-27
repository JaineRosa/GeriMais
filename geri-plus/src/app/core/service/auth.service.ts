import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthRepository } from '../repository/auth.repositoy';
import { AuthModel } from '../models/auth.model';
import { UserModel } from '../models/user.model';

export const currentKey = 'currentUser';
export const idosoAcessoKey = 'idosoAcessoId';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private repository = inject(AuthRepository);

  login(email: string, senha: string): Observable<boolean> {
    return this.repository.login({ email, senha: senha, platform: 'WEB' }).pipe(
      map((response: any) => {
        console.log('AuthService: Resposta bruta do login:', response);
        if (!response.usuario && response.user) {
          response.usuario = response.user;
        }

        localStorage.setItem(currentKey, JSON.stringify(response));
        return true;
      }),
      catchError((err) => {
        console.error('AuthService: Erro no login:', err);
        return of(false);
      })
    );
  }

  loginFamiliar(nomeFamiliar: string, nomeIdoso: string, cpfIdoso: string): Observable<boolean> {
    return this.repository.login({ nomeFamiliar, nomeIdoso, cpfIdoso, platform: 'WEB' }).pipe(
      map((response: any) => {
        localStorage.setItem(currentKey, JSON.stringify(response));

        const idosoId = response.idosoId || response.idoso_id_acesso;

        if (idosoId) {
          localStorage.setItem(idosoAcessoKey, idosoId);
          return true;
        } else {
          console.warn(
            'AuthService: Login Familiar efetuado, mas ID do idoso não encontrado na resposta.'
          );
          return false;
        }
      }),
      catchError((err) => {
        console.error('AuthService: Erro no login familiar:', err);
        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(currentKey);
  }

  logout(): void {
    localStorage.removeItem(currentKey);
    localStorage.removeItem(idosoAcessoKey);
  }

  getIdosoIdAcesso(): string | null {
    return localStorage.getItem(idosoAcessoKey);
  }

 getUsuario(): UserModel | null {
  const raw = localStorage.getItem(currentKey);
  if (!raw) return null;
  try {
    const auth = JSON.parse(raw);
    if (auth.usuario) return auth.usuario;
    if (auth.user) return auth.user;

    return null;
  } catch (err) {
    console.error('Erro ao parsear localStorage:', err);
    return null;
  }
}

  getPerfil(): string {
    const raw = localStorage.getItem(currentKey);
    if (!raw) return '';

    try {
      const data = JSON.parse(raw);

      if (data?.usuario?.tipoUsuario) return data.usuario.tipoUsuario;

      if (data?.user?.tipoUsuario) return data.user.tipoUsuario;

      if (data?.tipoUsuario) return data.tipoUsuario;

      return '';
    } catch (err) {
      console.error('Erro ao ler perfil:', err);
      return '';
    }
  }
}
