import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthRepository } from '../repository/auth.repositoy';
import { AuthModel } from '../../models/auth.model';
import { UserModel } from '../../models/user.model';

export const currentKey = 'currentUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private repository = inject(AuthRepository);


  login(email: string, senha: string): Observable<boolean> {
    return this.repository.login({ email, password: senha, platform: 'WEB' }).pipe(
      map((value: AuthModel) => {
        localStorage.setItem(currentKey, JSON.stringify(value));
        console.log('Login realizado com sucesso:', value);
        return true;
      }),
      catchError((err) => {
        console.error('Erro ao realizar login:', err);
        return of(false);
      })
    );
  }

  loginFamiliar(nomeFamiliar: string, nomeIdoso: string, cpfIdoso: string): Observable<boolean> {
    return this.repository.login({ nomeFamiliar, nomeIdoso, cpfIdoso, platform: 'WEB' }).pipe(
      map((value: AuthModel) => {
        localStorage.setItem(currentKey, JSON.stringify(value));
        return true;
      })
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(currentKey);
  }

  logout(): void {
    localStorage.removeItem(currentKey);
  }

  getUsuario(): UserModel | null {
    const raw = localStorage.getItem(currentKey);
    if (!raw) return null;
    try {
      const auth: AuthModel = JSON.parse(raw);
      return auth.user;
    } catch (err) {
      console.error('Erro ao parsear localStorage:', err);
      return null;
    }
  }

  getPerfil(): string {
    const usuario = this.getUsuario();
    return usuario?.tipoUsuario || '';
  }
}
