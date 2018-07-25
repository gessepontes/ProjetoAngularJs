import { Injectable, Inject } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { HttpClient } from '../httpclient';

@Injectable()
export class ArquivoService{
    myAppUrl: string = "";

    constructor(private _http: Http,private _httpClient: HttpClient) {
        this.myAppUrl = localStorage.getItem('sUrl');
    }

    addArquivo(fileToUpload: any, IDInstituicaoProjeto: any, iTipo: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
        input.append("IDInstituicaoProjeto", IDInstituicaoProjeto);
        input.append("iTipo", iTipo);

        return this._http
            .post(this.myAppUrl + "Arquivo", input)
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);

    }

    deleteArquivo(id: number) {
        return this._httpClient.delete(this.myAppUrl + "Arquivo/" + id, localStorage.getItem('token'))
            .map((response: Response) => response.json())
            .catch(this._httpClient.errorHandler);
    }

    download(id: number, iTipo: number) {
        return this._http.get(this.myAppUrl + "Arquivo/" + id + "/" + iTipo, { responseType: ResponseContentType.Blob }).map(
            (res) => {
                return new Blob([res.blob()], { type: 'application/pdf' })
            });
    }
}

