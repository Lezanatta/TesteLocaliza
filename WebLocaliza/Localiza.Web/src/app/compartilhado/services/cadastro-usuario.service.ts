import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResponseLogin } from '../../recursos/Interfaces/ResponseLogin';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CadastroUsuarioService {
  private apiUrl = 'http://54.232.12.47:5000/api/usuarios';
  constructor(private httpClient: HttpClient) { }

  cadastrarUsuario(nome: string, email: string, senha: string): Observable<ResponseLogin> {
    const modelUsuario = {
      Nome: nome,
      Email: email,
      Senha: senha
    };

    return this.httpClient.post<ResponseLogin>(this.apiUrl, modelUsuario);
  }
}
