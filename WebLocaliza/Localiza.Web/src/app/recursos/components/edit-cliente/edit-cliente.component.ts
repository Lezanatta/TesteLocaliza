import { MensagemService } from '../../../compartilhado/services/mensagem.service';
import { Component } from '@angular/core';
import { ModelMensagemComponent } from '../../../compartilhado/components/model-mensagem/model-mensagem.component';
import { FormDinamicoComponent } from '../../../compartilhado/components/form-dinamico/form-dinamico.component';
import { FormGroup } from '@angular/forms';
import { Clientes } from '../../Interfaces/Clientes';
import { ClientesService } from '../../../compartilhado/services/clientes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-cliente',
  standalone: true,
  imports: [ModelMensagemComponent, FormDinamicoComponent],
  templateUrl: './edit-cliente.component.html',
  styleUrl: './edit-cliente.component.scss'
})
export class EditClienteComponent  {
  clienteIdParaEditar!: number;
  form: FormGroup = new FormGroup({});
  TituloFormLogin: string = "Editar cliente";
  link = { tituloLink: 'Cancelar', rotaLink: '/home' };
  cliente!: Clientes;

  campos!: any[];

  constructor(
    public mensageService: MensagemService,
    private clienteService : ClientesService,
    private route : ActivatedRoute,
    private mensagemService : MensagemService,
    private router : Router
  ) {  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clienteIdParaEditar = + params.get('id')!;
    });

    this.clienteService.obterClienteId(this.clienteIdParaEditar).subscribe(
      (data: Clientes) => {
        this.cliente = data;
        this.inicializarCamposComValores();
        this.TituloFormLogin += ' (' + this.cliente.nome + ')';
      },
      (error) => {
        console.error('Erro ao obter clientes com cobranças', error);
      }
    );
  }

  submitEdicao(formEdicaoCliente: FormGroup){
    if (formEdicaoCliente.valid) {
      const cliente: Clientes =  this.obterCliente(formEdicaoCliente)

      this.clienteService.editarCliente(cliente).subscribe({
        next:() => {
          const titulo = 'Usuário ' + cliente.nome + ' editado com sucesso!';
          const mensagem = 'Usuário editado com sucesso!';
          this.mensagemService.adicionarMensagem(mensagem, titulo);
          this.router.navigate(['/home'])
        }
      })
    }
  }

  inicializarCamposComValores(): void {
    this.campos = [
      { label: 'Nome', tipo: 'text', nome: 'nome', valorInicial: this.cliente.nome},
      { label: 'Documento', tipo: 'text', nome: 'documento', valorInicial: this.cliente.documento},
      { label: 'Telefone', tipo: 'text', nome: 'telefone', valorInicial: this.cliente.telefone},
      { label: 'Endereco', tipo: 'text', nome: 'endereco', valorInicial: this.cliente.endereco}
    ]
  }

  private obterCliente(form : FormGroup) : Clientes{
    return {
      id: this.clienteIdParaEditar,
      usuarioId: 1,
      nome: form.get('nome')?.value,
      documento: form.get('documento')?.value,
      telefone: form.get('telefone')?.value,
      endereco: form.get('endereco')?.value,
      pagos: 0,
      abertos: 0,
      atrasados: 0
    }
  }
}
