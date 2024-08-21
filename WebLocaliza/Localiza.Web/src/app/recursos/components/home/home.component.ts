import { MensagemService } from '../../../compartilhado/services/mensagem.service';
import { Component, ViewChild } from '@angular/core';
import { Clientes } from '../../Interfaces/Clientes';
import { ClientesService } from '../../../compartilhado/services/clientes.service';
import { BtnComponent } from '../../../compartilhado/components/btn/btn.component';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';
import { ConfirmacaoModalComponent } from '../../../compartilhado/components/confirmacao-modal/confirmacao-modal.component';
import { ModelMensagemComponent } from '../../../compartilhado/components/model-mensagem/model-mensagem.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [BtnComponent, FontAwesomeModule, ConfirmacaoModalComponent, ModelMensagemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  clientes: Clientes[] = [];
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  modalConfirmacaoExclusão!: boolean;
  modalConfirmacaoExclusao: boolean = false;
  clienteIdParaExcluir!: number | null;

  @ViewChild(ConfirmacaoModalComponent) confirmDialog!: ConfirmacaoModalComponent;

  constructor(
    private serviceCliente: ClientesService,
    private router: Router,
    public mensagemService : MensagemService,
  ) { }

  ngOnInit(): void {
    this.serviceCliente.obterClientesUsuarioId().subscribe(
      (data: Clientes[]) => {
        this.clientes = data;
        this.calcularDebitosClientes()
      },
      (error) => {
        console.error('Erro ao obter clientes com cobranças', error);
      }
    );
  }

  cadastrarCliente(){
    this.router.navigate(['/cliente']);
  }

  submiteEditar(id: number){
    this.router.navigate(['/cliente', id]);
  }

  submitExcluir(id: number){
    this.clienteIdParaExcluir = id;
    this.confirmDialog.open();
  }

  submitCobrancas(id: number){
    this.router.navigate(['/cobrancas', id]);
  }

  private calcularDebitosClientes(){
    this.clientes.forEach(cliente => {
      let pagos = 0;
      let abertos = 0;
      let atrasados = 0;

      cliente.cobrancas?.forEach(cobranca => {
        if (cobranca.pago === 1) {
          pagos++;
        } else if (this.compararData(cobranca.dataVencimento)) {
          atrasados++;
        } else {
          abertos++;
        }
      });

      cliente.pagos = pagos;
      cliente.abertos = abertos;
      cliente.atrasados = atrasados;
    });

  }

  confirmDeletion() {
    if (this.clienteIdParaExcluir) {
      this.deleteCliente(this.clienteIdParaExcluir);
    }
    this.clienteIdParaExcluir = null;
  }

  cancelDeletion() {
    this.clienteIdParaExcluir = null;
  }

  deleteCliente(id: number) {
    const clienteExcluir = this.clientes.find(cliente => cliente.id === id);

    if (clienteExcluir?.cobrancas && clienteExcluir.cobrancas.length > 0) {
      const mensagem = 'Não é possível excluir um cliente que possui cobranças relacionadas. Exclua as cobranças associadas ao cliente para poder excluí-lo';
      const titulo = 'AVISO!';
      this.mensagemService.adicionarMensagem(mensagem, titulo);
    }
    else{
      this.serviceCliente.excluirCliente(id).subscribe({
        next:() => {
          const mensagem = 'Usuário deletado com sucesso!';
          const titulo = 'Usuário foi excluído com sucesso!';
          this.mensagemService.adicionarMensagem(mensagem, titulo);
          window.location.reload();
        }
      });
    }
  }

  compararData(data: Date): boolean {
    const dataFormatada = new Date(data);
    dataFormatada.setHours(0, 0, 0, 0);

    const dataAtual = new Date();

    dataAtual.setHours(0, 0, 0, 0);

    return dataFormatada < dataAtual;
  }
}
