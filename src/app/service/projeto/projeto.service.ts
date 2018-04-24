import { Injectable, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient } from '../httpclient';

@Injectable()
export class ProjetoService{
  myAppUrl: string = "";

  constructor(private _httpClient: HttpClient) {
    this.myAppUrl = localStorage.getItem('sUrl');
  }

  getProjetos() {
    return this._httpClient.get(this.myAppUrl + 'Projeto/', localStorage.getItem('token'))
      .map((response: Response) => response.json())
      .catch(this._httpClient.errorHandler);
  }

  getProjetoById(id: number) {
    return this._httpClient.get(this.myAppUrl + "Projeto/" + id, localStorage.getItem('token'))
      .map((response: Response) => response.json())
      .catch(this._httpClient.errorHandler)
  }

  getProjetoByIdInstituicao(id: number) {
    return this._httpClient.get(this.myAppUrl + "Projeto/GetByIdIsntituicao/" + id, localStorage.getItem('token'))
      .map((response: Response) => response.json())
      .catch(this._httpClient.errorHandler)
  }

  addProjeto(projeto: any) {
    return this._httpClient.post(this.myAppUrl + 'Projeto/', projeto, localStorage.getItem('token'))
      .map((response: Response) => response.json())
      .catch(this._httpClient.errorHandler)
  }

  updateProjeto(projeto: any) {
    return this._httpClient.put(this.myAppUrl + 'Projeto/', projeto, localStorage.getItem('token'))
      .map((response: Response) => response.json())
      .catch(this._httpClient.errorHandler);
  }

  deleteProjeto(id: number) {
    return this._httpClient.delete(this.myAppUrl + "Projeto/" + id, localStorage.getItem('token'))
      .map((response: Response) => response.json())
      .catch(this._httpClient.errorHandler);
  }
}