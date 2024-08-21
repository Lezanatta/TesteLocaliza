import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class GetStorageService {
  private storage: Storage | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.storage = window.localStorage;
    }
  }

  loginRealizado() : boolean{
    const result = this.getAuthToken()

    return result ? true : false;
  }

  getAuthToken(): string | null {
    if (this.storage) {
      return this.storage.getItem('token');
    }

    return null;
  }

  getUsername(): string | null {
    if (this.storage) {
      return this.storage.getItem('nome');
    }
    return null;
  }

  getIdUsuario(): string | null {
    if (this.storage) {
      return this.storage.getItem('idUsuario');
    }
    return null;
  }

  logout() {
    if (this.storage) {
      this.storage.clear();
    }
  }
}
