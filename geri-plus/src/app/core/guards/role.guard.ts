import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

export const RoleGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const perfil = authService.getPerfil();
  if (perfil === 'ADMIN' || perfil === 'CUIDADOR_PROFISSIONAL') {
    return true; // ✅ autorizado
  }

  router.navigate(['/painel']); // redireciona se não tiver permissão
  return false;
};
