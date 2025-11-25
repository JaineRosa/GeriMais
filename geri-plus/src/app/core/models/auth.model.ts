import { UserModel } from './user.model';

export interface AuthModel {
  token: string; 
  expiresIn: number; 
  user: UserModel; 
}
