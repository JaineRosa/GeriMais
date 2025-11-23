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
        // Garante que o objeto retornado é a base de autenticação
        localStorage.setItem(currentKey, JSON.stringify(response));

        // 🌟 PONTO CHAVE: EXTRAIR E SALVAR O ID DO IDOSO
        // Assumindo que a API retorna o ID do idoso na propriedade 'idosoId' ou 'idoso_id_acesso'
        const idosoId = response.idosoId || response.idoso_id_acesso;

        if (idosoId) {
          localStorage.setItem(idosoAcessoKey, idosoId);
          return true;
        } else {
          console.warn(
            'AuthService: Login Familiar efetuado, mas ID do idoso não encontrado na resposta.'
          );
          // Se não houver ID do idoso, o login técnico ainda pode ser true, mas o redirecionamento falhará.
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
    localStorage.removeItem(idosoAcessoKey); // Limpa também o ID do idoso
  }

 getIdosoIdAcesso(): string | null {
    return localStorage.getItem(idosoAcessoKey);
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
    const raw = localStorage.getItem(currentKey);
    if (!raw) return '';

    try {
      const data = JSON.parse(raw);

      // 1. Tenta ler de usuario.tipoUsuario (Padrão novo Java)
      if (data?.usuario?.tipoUsuario) return data.usuario.tipoUsuario;

      // 2. Tenta ler de user.tipoUsuario (Padrão antigo ou AuthModel)
      if (data?.user?.tipoUsuario) return data.user.tipoUsuario;

      // 3. Tenta ler da raiz (caso o backend tenha mudado DTO)
      if (data?.tipoUsuario) return data.tipoUsuario;

      return '';
    } catch (err) {
      console.error('Erro ao ler perfil:', err);
      return '';
    }
  }
}
