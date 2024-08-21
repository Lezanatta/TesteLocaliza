import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-model-mensagem',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './model-mensagem.component.html',
  styleUrl: './model-mensagem.component.scss'
})
export class ModelMensagemComponent {
  @Input() tituloModal!: string;
  @Input() mensagem!: string;
  @Output() close = new EventEmitter();
  fatimes = faTimes;

  get cobrirTelaModal(): boolean {
    return !! this.mensagem;
  }

  clear(){
    this.close.emit()
  }
}
