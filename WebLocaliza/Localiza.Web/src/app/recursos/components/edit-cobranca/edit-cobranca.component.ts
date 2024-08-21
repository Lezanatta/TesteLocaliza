import { CobrancasService } from './../../../compartilhado/services/cobrancas.service';
import { MensagemService } from '../../../compartilhado/services/mensagem.service';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelMensagemComponent } from '../../../compartilhado/components/model-mensagem/model-mensagem.component';
import { FormDinamicoComponent } from '../../../compartilhado/components/form-dinamico/form-dinamico.component';
import { Cobranca } from '../../Interfaces/Cobrancas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-cobranca',
  standalone: true,
  imports: [ModelMensagemComponent, FormDinamicoComponent],
  templateUrl: './edit-cobranca.component.html',
  styleUrl: './edit-cobranca.component.scss'
})
export class EditCobrancaComponent {
  cobrancaIdEditar!: number;
  form: FormGroup = new FormGroup({});
  TituloFormLogin: string = "Editar cobrança";
  link = { tituloLink: 'Cancelar', rotaLink: '/home' };
  cobranca!: Cobranca;

  campos!: any[];

  constructor(
    public mensageService: MensagemService,
    private cobrancaService : CobrancasService,
    private route : ActivatedRoute,
    private mensagemService : MensagemService,
    private router : Router,
    private datePipe: DatePipe,
  ) {  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.cobrancaIdEditar = + params.get('id')!;
    });

    this.cobrancaService.obterCobrancaId(this.cobrancaIdEditar).subscribe(
      (data: Cobranca) => {
        this.cobranca = data;
        this.inicializarCamposComValores();
        this.TituloFormLogin += ' (' + this.cobranca.descricao + ')';
      },
      (error) => {
        console.error('Erro ao obter clientes com cobranças', error);
      }
    );
  }

  submitEdicao(formEdicaoCobranca : FormGroup){
    if (formEdicaoCobranca.valid) {
      const cobranca: Cobranca =  this.obterCobranca(formEdicaoCobranca)

      this.cobrancaService.editarCobranca(cobranca).subscribe({
        next:() => {
          const titulo = 'Cobrança ' + cobranca.descricao + ' editado com sucesso!';
          const mensagem = 'Cobrança editada com sucesso!';
          this.mensagemService.adicionarMensagem(mensagem, titulo);
          this.router.navigate(['/home'])
        }
      })
    }
  }

  inicializarCamposComValores(): void {
    const flagPago = this.cobranca.pago == 1 ? 'sim' : 'nao';
    this.campos = [
      { label: 'Data Vencimento', tipo: 'date', nome: 'dataVencimento', valorInicial: this.formatarData(new Date(this.cobranca.dataVencimento))},
      { label: 'Valor', tipo: 'text', nome: 'valor', valorInicial: this.cobranca.valor},
      { label: 'Cobrança paga', tipo: 'select', nome: 'pago', valorInicial: flagPago ,options: [
        { value: 'sim', label: 'Sim' },
        { value: 'nao', label: 'Não' }
      ]
    }
    ]
  }

  private obterCobranca(form : FormGroup) : Cobranca{
    return {
      idCobranca : this.cobrancaIdEditar,
      dataVencimento : form.get('dataVencimento')?.value,
      valor : form.get('valor')?.value,
      pago : form.get('pago')?.value == 'sim' ? 1 : 0,
      descricao : ''
    }
  }

  formatarData(data: Date): string {
    const ano = data.getFullYear();

    const mes = ('0' + (data.getMonth() + 1)).slice(-2);

    const dia = ('0' + data.getDate()).slice(-2);

    return `${ano}-${mes}-${dia}`;
  }

}
