import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  mensagem : string = "";
  tituloModal : string = "";

  constructor() { }

  adicionarMensagem(msg : string, titulo : string){
    this.mensagem = msg;
    this.tituloModal = titulo;
  }

  fecharModal(){
    this.mensagem = '';
    this.tituloModal = '';
  }
}
