import { Injectable } from '@angular/core';
import { Http,Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { HttpClient } from '../httpclient';

@Injectable()
export class ArquivoInstituicaoService{
    myAppUrl: string = "";

    constructor(private _http: Http,private _httpClient: HttpClient) {
        this.myAppUrl = localStorage.getItem('sUrl');
    }

    getArquivoInstituicoes() {
        return this._httpClient.get(this.myAppUrl + 'ArquivoInstituicao/', localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);
    }

    getArquivoInstituicaoById(id: number) {
        return this._httpClient.get(this.myAppUrl + "ArquivoInstituicao/" + id, localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler)
    }

    addArquivoInstituicao(fileToUpload: any, IDInstituicao: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
        input.append("IDInstituicao", IDInstituicao);

        return this._http
            .post(this.myAppUrl + "ArquivoInstituicao", input)
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);

    }


    deleteArquivoInstituicao(id: number) {
        return this._httpClient.delete(this.myAppUrl + "ArquivoInstituicao/" + id, localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);
    }

    download(id: number) {
        return this._http.get(this.myAppUrl + "ArquivoInstituicao/" + id, { responseType: ResponseContentType.Blob }).map(
            (res) => {
                return new Blob([res.blob()], { type: 'application/pdf' })
            });
    }
}

