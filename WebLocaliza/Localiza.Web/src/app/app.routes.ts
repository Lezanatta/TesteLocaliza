import { Routes } from '@angular/router';
import { LoginComponent } from './recursos/components/login/login.component';
import { CadastroComponent } from './recursos/components/cadastro/cadastro.component';
import { HomeComponent } from './recursos/components/home/home.component';
import { CadastroClienteComponent } from './recursos/components/cadastro-cliente/cadastro-cliente.component';
import { CobrancasComponent } from './recursos/components/cobrancas/cobrancas.component';
import { EditClienteComponent } from './recursos/components/edit-cliente/edit-cliente.component';
import { CadastroCobrancaComponent } from './recursos/components/cadastro-cobranca/cadastro-cobranca.component';
import { EditCobrancaComponent } from './recursos/components/edit-cobranca/edit-cobranca.component';
import { canActivateAuth } from './core/Interceptadores/canActivateAuth';

export const routes: Routes = [
  { component: LoginComponent, path: 'login'},
  { component: CadastroComponent, path: 'cadastrar'},
  { component: HomeComponent, path: 'home', canActivate: [canActivateAuth]},
  { component: CadastroClienteComponent, path: 'cliente', canActivate: [canActivateAuth]},
  { component: CobrancasComponent, path: 'cobrancas/:id', canActivate: [canActivateAuth] },
  { component: CadastroCobrancaComponent, path: 'cadastrarCobranca/:id', canActivate: [canActivateAuth] },
  { component: EditCobrancaComponent, path: 'editarCobranca/:id', canActivate: [canActivateAuth] },
  { component: EditClienteComponent, path: 'cliente/:id', canActivate: [canActivateAuth] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];
