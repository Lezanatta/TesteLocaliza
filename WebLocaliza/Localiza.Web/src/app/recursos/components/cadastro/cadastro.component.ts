import { CadastroUsuarioService } from '../../../compartilhado/services/cadastro-usuario.service';
import { Component } from '@angular/core';
import { ModelMensagemComponent } from '../../../compartilhado/components/model-mensagem/model-mensagem.component';
import { FormDinamicoComponent } from '../../../compartilhado/components/form-dinamico/form-dinamico.component';
import { BtnComponent } from '../../../compartilhado/components/btn/btn.component';
import { FormGroup, Validators } from '@angular/forms';
import { MensagemService } from '../../../compartilhado/services/mensagem.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [ModelMensagemComponent, FormDinamicoComponent, BtnComponent],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss'
})
export class CadastroComponent {
  form: FormGroup = new FormGroup({});
  TituloFormLogin: string = "Cadastrar";
  link = { tituloLink: 'Cancelar', rotaLink: '/login' };

  campos = [
    { label: 'Nome', tipo: 'nome', nome: 'nome'},
    { label: 'Email', tipo: 'email', nome: 'email', validacao: Validators.email },
    { label: 'Senha', tipo: 'password', nome: 'senha', validacao: Validators.minLength(5) }
  ];

  constructor(private serviceCadastro : CadastroUsuarioService, private router: Router, public mensageService: MensagemService) { }

  ngOnInit() {
    console.log('CadastroComponent inicializado');
  }

  submitCadastroUsuario(localizaForm: FormGroup){
    if (localizaForm.valid) {
      const { nome, email, senha } = localizaForm.value;

      this.serviceCadastro.cadastrarUsuario(nome, email, senha).subscribe({
        next:() => {
          const mensagem = 'Usuário cadastrado com sucesso!';
          const titulo = 'Usuário ' + nome + ' cadastrado com sucesso';
          this.mensageService.adicionarMensagem(mensagem, titulo);
          this.router.navigate(['/login']);
        },
        error: (err: HttpErrorResponse) => {
          this.mensageService.adicionarMensagem('Erro nos dados de cadastro!', 'Não foi possível realizar o cadastro.');
        }
      });
    }
  }
}
