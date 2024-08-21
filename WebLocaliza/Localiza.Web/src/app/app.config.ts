import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { AdicionarAutenticacao } from './core/Interceptadores/InterceptAutenticacao';

export const appConfig: ApplicationConfig = {
  providers: [
    DatePipe,
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([AdicionarAutenticacao]))
  ]
};
