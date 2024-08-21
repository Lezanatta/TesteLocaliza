import { GetStorageService } from './get-storage.service';
import { Clientes } from '../../recursos/Interfaces/Clientes';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private apiUrl = 'http://54.232.12.47:5000/api/clientes/';

  constructor(private httpClient: HttpClient, private getStorageService : GetStorageService) { }

  obterClientesUsuarioId() : Observable<Clientes[]> {
    const valorIdUsuario = this.getStorageService.getIdUsuario();
    if (valorIdUsuario !== null) {

      const idUsuario = parseInt(valorIdUsuario, 10);
      return this.httpClient.get<Clientes[]>(this.apiUrl + 'cobrancas/' + idUsuario).pipe(
        catchError(error => {
          return throwError(() => new Error('Erro ao cadastrar novo cliente'));
        })
      );
    }
    else {
      return throwError(() => new Error('ID do usuário não encontrado'));
    }
  }

  obterClienteId(clienteId : number) : Observable<Clientes> {
    return this.httpClient.get<Clientes>(this.apiUrl + clienteId);
  }

  cadastrarCliente(cliente : Clientes): Observable<any> {
    const valorIdUsuario = this.getStorageService.getIdUsuario();
    if (valorIdUsuario !== null) {
      const idUsuario = parseInt(valorIdUsuario, 10);
      cliente.usuarioId = idUsuario
      return this.httpClient.post<any>(this.apiUrl, cliente).pipe(
        catchError(error => {
          return throwError(() => new Error('Erro ao cadastrar novo cliente'));
        })
      );
    }
    else {
      return throwError(() => new Error('ID do usuário não encontrado'));
    }
  }

  editarCliente(cliente: Clientes): Observable<string> {
    return this.httpClient.put<string>(this.apiUrl, cliente, {
      responseType: 'text' as 'json'
    });
  }

  excluirCliente(clienteId: number): Observable<any> {
    const url = `${this.apiUrl}${clienteId}`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }
}
