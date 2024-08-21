import { inject } from '@angular/core';
import { CanActivateFn, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { GetStorageService } from '../../compartilhado/services/get-storage.service';

export const canActivateAuth: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const router = inject(Router)

  const permissao = verificarAutenticacao();

  if (!permissao) {
    router.navigate(['/login']);
  }

  return permissao;
}

function verificarAutenticacao(): boolean{

  const getStorage = inject(GetStorageService);

  const token = getStorage.getAuthToken();

  return !!token;
}





