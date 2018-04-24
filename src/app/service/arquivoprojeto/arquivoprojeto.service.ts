import { Injectable, Inject } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpClient } from '../httpclient';

@Injectable()
export class ArquivoProjetoService{
    myAppUrl: string = "";

    constructor(private _http: Http,private _httpClient: HttpClient) {
        this.myAppUrl = localStorage.getItem('sUrl');
    }

    getArquivoProjeto() {
        return this._httpClient.get(this.myAppUrl + 'ArquivoProjeto/', localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);
    }

    getArquivoProjetoById(id: number) {
        return this._httpClient.get(this.myAppUrl + "ArquivoProjeto/" + id, localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler)
    }

    addArquivoProjeto(fileToUpload: any, IDProjeto: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
        input.append("IDProjeto", IDProjeto);

        return this._http
            .post(this.myAppUrl + "ArquivoProjeto", input)
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);

    }


    deleteArquivoProjeto(id: number) {
        return this._httpClient.delete(this.myAppUrl + "ArquivoProjeto/" + id, localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);
    }

    download(id: number) {
        return this._http.get(this.myAppUrl + "ArquivoProjeto/" + id, { responseType: ResponseContentType.Blob }).map(
            (res) => {
                return new Blob([res.blob()], { type: 'application/pdf' })
            });
    }
}

