import { Injectable } from '@angular/core';
import { Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpClient } from '../httpclient';

@Injectable()
export class InstituicaoService {
    myAppUrl: string = "";

    constructor(private _httpClient: HttpClient) {
        this.myAppUrl = localStorage.getItem('sUrl');
    }

    getInstituicaoById(id: number) {
        return this._httpClient.get(this.myAppUrl + "Instituicao/" + id, localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler)
    }

    addInstituicao(instituicao: any) {
        return this._httpClient.post(this.myAppUrl + 'Instituicao/', instituicao, "")
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler)
    }

    updateInstituicao(instituicao: any) {
        return this._httpClient.put(this.myAppUrl + 'Instituicao/', instituicao, localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);
    }
}