import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Geral } from '../../model/geral';

@Injectable()
export class ProjetoService extends Geral {
  myAppUrl: string = "";

  constructor(private _http: Http) {
    super();
    this.myAppUrl = this.sUrl;
  }

  getProjetos() {
    return this._http.get(this.myAppUrl + 'Projeto/')
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  getProjetoById(id: number) {
    return this._http.get(this.myAppUrl + "Projeto/" + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  getProjetoByIdInstituicao(id: number) {
    return this._http.get(this.myAppUrl + "Projeto/" + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  addProjeto(projeto: any) {
    return this._http.post(this.myAppUrl + 'Projeto/', projeto)
      .map((response: Response) => response.json())
      .catch(this.errorHandler)
  }

  updateProjeto(projeto: any) {
    return this._http.put(this.myAppUrl + 'Projeto/', projeto)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  deleteProjeto(id: number) {
    return this._http.delete(this.myAppUrl + "Projeto/" + id)
      .map((response: Response) => response.json())
      .catch(this.errorHandler);
  }

  prazo() {
    return this._http.get(this.myAppUrl + "Prazo/")
      .map((response: Response) => {
        return response.json();
      })
      .catch(this.errorHandler)
  }

  errorHandler(error: Response) {
    console.log(error);
    return Observable.throw(error);
  }
}