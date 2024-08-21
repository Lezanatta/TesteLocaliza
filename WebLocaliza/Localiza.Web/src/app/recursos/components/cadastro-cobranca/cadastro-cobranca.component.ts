import { Component } from '@angular/core';
import { ModelMensagemComponent } from '../../../compartilhado/components/model-mensagem/model-mensagem.component';
import { FormDinamicoComponent } from '../../../compartilhado/components/form-dinamico/form-dinamico.component';
import { MensagemService } from '../../../compartilhado/services/mensagem.service';
import { FormGroup } from '@angular/forms';
import { Cobranca } from '../../Interfaces/Cobrancas';
import { ActivatedRoute, Router } from '@angular/router';
import { CobrancasService } from '../../../compartilhado/services/cobrancas.service';

@Component({
  selector: 'app-cadastro-cobranca',
  standalone: true,
  imports: [ModelMensagemComponent, FormDinamicoComponent],
  templateUrl: './cadastro-cobranca.component.html',
  styleUrl: './cadastro-cobranca.component.scss'
})
export class CadastroCobrancaComponent {
  clienteId!: number;
  form: FormGroup = new FormGroup({});
  TituloFormLogin: string = "Cadastrar Cobrança";
  link = { tituloLink: 'Cancelar', rotaLink: '/home'};

  campos = [
    { label: 'descricao', tipo: 'text', nome: 'descricao' },
    { label: 'valor', tipo: 'text', nome: 'valor'},
    { label: 'Data de Vencimento', tipo: 'date', nome: 'dataVencimento'},
    { label: 'Cobrança paga', tipo: 'select', nome: 'pago', valorInicial: 'sim' ,options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' }
      ]
    }
  ];

  constructor(
    public mensageService : MensagemService,
    private route : ActivatedRoute,
    private cobrancaService : CobrancasService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clienteId = + params.get('id')!;
    });
  }


  submitCadastroCobranca(formCliente: FormGroup){
    const cobranca: Cobranca =  {
      idCobranca: 0,
      descricao: formCliente.get('descricao')?.value,
      valor: formCliente.get('valor')?.value,
      dataVencimento: formCliente.get('dataVencimento')?.value,
      pago: formCliente.get('pago')?.value == 'sim' ? 1 : 0,
      ClienteId: this.clienteId
    }

    this.cobrancaService.cadastrarCobranca(cobranca).subscribe({
      next: () => {
        const mensagem = 'Nova cobrança adicionada com sucesso!'
        const titulo = 'Cobrança adicionada!'
        this.mensageService.adicionarMensagem(mensagem, titulo)
        this.router.navigate(['/home'])
      }
    })
  }
}
