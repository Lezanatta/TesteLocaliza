import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';
import { GetStorageService } from '../../compartilhado/services/get-storage.service';

export const AdicionarAutenticacao: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const getStorage = inject(GetStorageService);

  const authToken = getStorage.getAuthToken();

  if(authToken){
    const newReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`)
    });

    return next(newReq);
  }

  else{
    return next(req)
  }
};

