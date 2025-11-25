import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const RoleGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const perfil = authService.getPerfil();
  console.log('RoleGuard Verificando acesso para:', state.url);
  console.log('Perfil do usuário:', perfil);

  const perfilUpper = perfil ? perfil.toUpperCase() : '';

  if (perfilUpper === 'ADMIN' || perfilUpper === 'CUIDADOR_PROFISSIONAL') {
    console.log('RoleGuard: Acesso PERMITIDO');
    return true; 
  }

  console.warn('RoleGuard: Acesso NEGADO. Redirecionando para /home');
  
  router.navigate(['/home']); 
  return false;
};
