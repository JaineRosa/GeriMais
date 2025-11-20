// auth.model.ts
// Modelo de autenticação no frontend.
// Representa a resposta do backend ao fazer login.
// Inclui o token JWT, tempo de expiração e os dados do usuário logado.

import { UserModel } from './user.model';

export interface AuthModel {
  token: string; // JWT ou outro token de autenticação
  expiresIn: number; // tempo de expiração em segundos
  user: UserModel; // objeto do usuário logado (vem do backend)
}
