import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import {  Observable, tap } from 'rxjs';
import { ResponseLogin } from '../../recursos/Interfaces/ResponseLogin';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://54.232.12.47:5001/api/Login';
  private storage: Storage | null = null;

  constructor(private httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = window.localStorage;
    }
  }

  login(email: string, password: string): Observable<ResponseLogin> {
    const modelLogin = {
      email: email,
      senha: password
    };

    return this.httpClient.post<ResponseLogin>(this.apiUrl, modelLogin).pipe(
      tap(response => {
        if (this.storage) {
          this.setStorage('token', response.token!);
          this.setStorage('nome', response.nomeUsuario!);
          this.setStorage('idUsuario', response.idUsuario.toString())
        }
      })
    );
  }

  private setStorage(key: string, value: string) {
    if (this.storage) {
      this.storage.setItem(key, value);
    }
  }
}
