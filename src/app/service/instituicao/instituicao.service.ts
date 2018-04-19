import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Geral } from '../../model/geral';

@Injectable()
export class InstituicaoService extends Geral {
    myAppUrl: string = "";

    constructor(private _http: Http) {
        super();
        this.myAppUrl = this.sUrl;
    }

    getInstituicoes() {
        return this._http.get(this.myAppUrl + 'Instituicao/')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getInstituicaoById(id: number) {
        return this._http.get(this.myAppUrl + "Instituicao/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    addInstituicao(instituicao: any) {
        return this._http.post(this.myAppUrl + 'Instituicao/', instituicao)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    updateInstituicao(instituicao: any) {
        return this._http.put(this.myAppUrl + 'Instituicao/', instituicao)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    deleteInstituicao(id: number) {
        return this._http.delete(this.myAppUrl + "Instituicao/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}