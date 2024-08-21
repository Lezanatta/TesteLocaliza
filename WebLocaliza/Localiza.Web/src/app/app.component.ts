import { Component } from '@angular/core';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { LoginComponent } from './recursos/components/login/login.component';
import { filter } from 'rxjs';
import { CadastroComponent } from './recursos/components/cadastro/cadastro.component';
import { HeaderComponent } from './compartilhado/components/header/header.component';
import { GetStorageService } from './compartilhado/services/get-storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, CadastroComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  currentRoute: string = '';
  title = 'Localiza.Web';

  constructor(private router: Router, private getStorage: GetStorageService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: Event) => {
      this.currentRoute = (event as NavigationEnd).urlAfterRedirects;
    });
  }

  isPaginaLogin(){
    return this.currentRoute === '/login';
  }

  isPaginaCadastro(){
    return this.currentRoute === '/cadastrar';
  }

  usuarioLogado(){
    return this.getStorage.loginRealizado();
  }
}
