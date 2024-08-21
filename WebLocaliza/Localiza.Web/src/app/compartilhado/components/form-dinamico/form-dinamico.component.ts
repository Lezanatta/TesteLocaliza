import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { BtnComponent } from '../btn/btn.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-form-dinamico',
  standalone: true,
  imports: [ReactiveFormsModule, BtnComponent, RouterLink],
  templateUrl: './form-dinamico.component.html',
  styleUrl: './form-dinamico.component.scss'
})
export class FormDinamicoComponent  {
  @Input() campos: {
    label: string,
    tipo: string,
    nome: string,
    validacao?: any,
    valorInicial?: string,
    options?: { value: string, label: string }[]
  }[] = [];

  @Input() form!: FormGroup;
  @Input() title!: string;
  @Output() submitForm = new EventEmitter<FormGroup>();
  @Input() TituloBtn!: string;
  @Input() linkMenu!: { tituloLink: string, rotaLink: string};

  ngOnInit(): void {
    this.campos.forEach(campo => {
      const validadores = [Validators.required];

      if (campo.validacao) {
        validadores.push(campo.validacao);
      }

      const valorInicial = campo.valorInicial || "";

      this.form.addControl(campo.nome, new FormControl(valorInicial, validadores));
    });
  }

  handleSubmit() {
    Object.keys(this.form.controls).forEach(key => {
      this.form.get(key)?.markAsTouched();
    });

    if (this.form.valid) {
      this.submitForm.emit(this.form);
    }
  }
}
