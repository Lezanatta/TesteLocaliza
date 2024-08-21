import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cobranca } from '../../recursos/Interfaces/Cobrancas';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CobrancasService {

  private apiUrl = 'http://54.232.12.47:5000/api/cobranca/';

  constructor(private httpClient: HttpClient) { }

  obterCobrancasCliente(id : Number): Observable<Cobranca[]> {
    return this.httpClient.get<Cobranca[]>(this.apiUrl +'clientes/' + id );
  }

  obterCobrancaId(id : Number): Observable<Cobranca> {
    return this.httpClient.get<Cobranca>(this.apiUrl + id );
  }

  cadastrarCobranca(cobranca : Cobranca) : Observable<any>{
    return this.httpClient.post<any>(this.apiUrl, cobranca);
  }

  editarCobranca(cobranca : Cobranca) : Observable<any>{
    return this.httpClient.put<string>(this.apiUrl, cobranca, {
      responseType: 'text' as 'json'
    });
  }

  excluirCobranca(cobrancaId : number): Observable<any> {
    const url = `${this.apiUrl}${cobrancaId }`;
    return this.httpClient.delete(url, { responseType: 'text' });
  }
}
