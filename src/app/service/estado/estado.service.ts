import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Geral } from '../../model/geral';

@Injectable()
export class EstadoService extends Geral {
    myAppUrl: string = "";

    constructor(private _http: Http) {
        super();
        this.myAppUrl = this.sUrl;
    }

    getEstados() {
        return this._http.get(this.myAppUrl + 'Estado/')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getIdEstadoByIdCidade(idCidade: number) {
        return this._http.get(this.myAppUrl + "Estado/" + idCidade)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}