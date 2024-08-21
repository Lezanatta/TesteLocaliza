import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-btn',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './btn.component.html',
  styleUrl: './btn.component.scss'
})
export class BtnComponent {
  @Input() icon: any;
  @Input('btn-text') btnText : string = "";
  @Input() disabled : boolean = false;
  @Output("submit") onSubmit = new EventEmitter();

  submit(){
    this.onSubmit.emit();
  }
}
