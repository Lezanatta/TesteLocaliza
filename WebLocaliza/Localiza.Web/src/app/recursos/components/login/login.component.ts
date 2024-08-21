import { Component } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BtnComponent } from '../../../compartilhado/components/btn/btn.component';
import { AuthService } from '../../../compartilhado/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ModelMensagemComponent } from '../../../compartilhado/components/model-mensagem/model-mensagem.component';
import { MensagemService } from '../../../compartilhado/services/mensagem.service';
import { FormDinamicoComponent } from '../../../compartilhado/components/form-dinamico/form-dinamico.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, ModelMensagemComponent, FormDinamicoComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({});
  TituloFormLogin: string = "Login";
  link = { tituloLink: 'Clique aqui para criar uma conta', rotaLink: '/cadastrar' };

  campos = [
    { label: 'Email', tipo: 'email', nome: 'email', validacao: Validators.email },
    { label: 'Senha', tipo: 'password', nome: 'senha', validacao: Validators.minLength(5) }
  ];

  constructor(private authService : AuthService, private router: Router, public mensageService: MensagemService) { }

  submitLogin(localizaForm: FormGroup){
    if (localizaForm.valid) {
      const { email, senha } = localizaForm.value;
      this.authService.login(email, senha).subscribe({
        next:() => {
          this.router.navigate(['/home']);
        },
        error: (err: HttpErrorResponse) => {
          const mensagem = err.status == 401 ? "Dados incorretos!" : "Erro ao realizar o login, informe seus dados novamente!";
          const titulo = 'Erro no login';
          this.mensageService.adicionarMensagem(mensagem, titulo);
        }
      });
    }
  }
}
