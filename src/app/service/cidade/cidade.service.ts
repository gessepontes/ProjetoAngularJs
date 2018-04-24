import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CidadeService{
    myAppUrl: string = "";

    constructor(private _http: Http) {
        this.myAppUrl = localStorage.getItem('sUrl');
    }

    getCidadeByIdEstado(id: number) {
        return this._http.get(this.myAppUrl + "Cidade/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }
  
    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}