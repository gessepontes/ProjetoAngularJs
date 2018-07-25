import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Diversos } from '../models/idiversos.model';

@Injectable()
export class DropdownService {

    myAppUrl: string = "";

    constructor(private http: HttpClient) {
        this.myAppUrl = localStorage.getItem('sUrl');
    }

    getEstados() {
        return this.http.get(this.myAppUrl + 'Estado/')
            .catch(this.errorHandler);
    }

    getIdEstadoByIdCidade(idCidade: number) {
        return this.http.get(this.myAppUrl + "Estado/" + idCidade)
            .catch(this.errorHandler)
    }

    getCidadeByIdEstado(id: number) {
        return this.http.get(this.myAppUrl + "Cidade/" + id)
            .catch(this.errorHandler)
    }

    getEsferas() {
        return this.http.get<Diversos[]>('assets/dados/esferas.json');
    }

    getNaturezas() {
        return this.http.get<Diversos[]>('assets/dados/naturezas.json');
    }

    getRegimes() {
        return this.http.get<Diversos[]>('assets/dados/regimes.json');
    }

    getAreas() {
        return this.http.get<Diversos[]>('assets/dados/areas.json');
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }
}