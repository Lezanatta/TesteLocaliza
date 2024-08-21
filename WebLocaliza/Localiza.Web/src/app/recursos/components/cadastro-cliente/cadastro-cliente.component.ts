import { Clientes } from '../../Interfaces/Clientes';
import { Component, ViewChild } from '@angular/core';
import { ModelMensagemComponent } from '../../../compartilhado/components/model-mensagem/model-mensagem.component';
import { FormDinamicoComponent } from '../../../compartilhado/components/form-dinamico/form-dinamico.component';
import { MensagemService } from '../../../compartilhado/services/mensagem.service';
import { FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../../compartilhado/services/clientes.service';
import { ConfirmacaoModalComponent } from '../../../compartilhado/components/confirmacao-modal/confirmacao-modal.component';

@Component({
  selector: 'app-cadastro-cliente',
  standalone: true,
  imports: [ModelMensagemComponent, FormDinamicoComponent],
  templateUrl: './cadastro-cliente.component.html',
  styleUrl: './cadastro-cliente.component.scss'
})
export class CadastroClienteComponent {
  @ViewChild(ConfirmacaoModalComponent) confirmDialog!: ConfirmacaoModalComponent;
  clienteIdToDelete!: number;
  form: FormGroup = new FormGroup({});
  TituloFormLogin: string = "Cadastrar Cliente";
  link = { tituloLink: 'Cancelar', rotaLink: '/home' };

  campos = [
    { label: 'Nome', tipo: 'text', nome: 'nome' },
    { label: 'Documento', tipo: 'text', nome: 'documento'},
    { label: 'Telefone', tipo: 'text', nome: 'telefone'},
    { label: 'Endereco', tipo: 'text', nome: 'endereco'}
  ];

  constructor(
    public mensageService: MensagemService,
    private router: Router,
    private clientesService: ClientesService
  ) {  }

  submitCadastro(formCliente: FormGroup){
    const cliente: Clientes =  {
      id: 0,
      usuarioId: 0,
      nome: formCliente.get('nome')?.value,
      documento: formCliente.get('documento')?.value,
      telefone: formCliente.get('telefone')?.value,
      endereco: formCliente.get('endereco')?.value,
      pagos: 0,
      abertos: 0,
      atrasados: 0
    }

    this.clientesService.cadastrarCliente(cliente).subscribe({
      next:() => {
        const titulo = 'Cliente Cadastrado com sucesso';
        const mensagem = 'Novo cliente ' + cliente.nome + ' cadastrado com sucesso';
        this.mensageService.adicionarMensagem(mensagem, titulo);
        this.router.navigate(['/home']);
      }
    })
  }
}
