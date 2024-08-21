import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cobranca } from '../../Interfaces/Cobrancas';
import { CobrancasService } from '../../../compartilhado/services/cobrancas.service';
import { BtnComponent } from '../../../compartilhado/components/btn/btn.component';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DatePipe } from '@angular/common';
import { MensagemService } from '../../../compartilhado/services/mensagem.service';
import { ConfirmacaoModalComponent } from '../../../compartilhado/components/confirmacao-modal/confirmacao-modal.component';

@Component({
  selector: 'app-cobrancas',
  standalone: true,
  imports: [BtnComponent, FontAwesomeModule, ConfirmacaoModalComponent],
  templateUrl: './cobrancas.component.html',
  styleUrl: './cobrancas.component.scss'
})
export class CobrancasComponent {
  clienteIdParaExcluir!: number | null;
  faPenToSquare = faPenToSquare;
  faTrash = faTrash;
  clienteId!: number;
  cobrancas: Cobranca[] = [];
  @ViewChild(ConfirmacaoModalComponent) confirmDialog!: ConfirmacaoModalComponent;

  constructor(
    private route: ActivatedRoute,
    private cobrancaService : CobrancasService,
    private router: Router,
    private datePipe: DatePipe,
    private mensagemService : MensagemService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.clienteId = + params.get('id')!;
    });

    this.cobrancaService.obterCobrancasCliente(this.clienteId).subscribe(
      (data: Cobranca[]) => {
        this.cobrancas = data;
        this.cobrancas.map(cobr => ({
          ...cobr,
          dataVencimento: new Date(cobr.dataVencimento)
        }));
      });
  }

  cadastrarCobranca(){
      this.router.navigate(['/cadastrarCobranca', this.clienteId]);
  }

  cancelar(){
    this.router.navigate(['/home'])
  }

  submiteEditar(id: number){
    this.router.navigate(['/editarCobranca', id])
  }

  submitExcluir(id: number){
    this.clienteIdParaExcluir = id;
    this.confirmDialog.open();
  }

  confirmDeletion() {
    if (this.clienteIdParaExcluir) {
      this.deleteCliente(this.clienteIdParaExcluir);
    }
    this.clienteIdParaExcluir = null;
  }

  deleteCliente(id: number) {
    this.cobrancaService.excluirCobranca(id).subscribe({
      next:() => {
        const mensagem = 'Cobrança deletada com sucesso!';
        const titulo = 'Cobrança foi excluída com sucesso!';
        this.mensagemService.adicionarMensagem(mensagem, titulo);
        this.router.navigate(['/home'])
      }
    });
  }

  cancelDeletion() {
    this.clienteIdParaExcluir = null;
  }

  formatarData(data: Date): string {
    return this.datePipe.transform(data, 'dd/MM/yyyy')!;
  }

  compararData(data: Date): boolean {
    const dataFormatada = new Date(data);
    dataFormatada.setHours(0, 0, 0, 0);

    const dataAtual = new Date();
    dataAtual.setHours(0, 0, 0, 0);

    return dataFormatada < dataAtual;
  }

}
