import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmacao-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirmacao-modal.component.html',
  styleUrl: './confirmacao-modal.component.scss'
})
export class ConfirmacaoModalComponent {

  @Output() confirm = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  isVisible = false;

  open() {
    this.isVisible = true;
  }

  close() {
    this.isVisible = false;
  }

  onConfirm() {
    this.close();
    this.confirm.emit();
  }

  onCancel() {
    this.close();
    this.cancel.emit();
  }
}
