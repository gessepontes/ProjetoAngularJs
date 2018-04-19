import { Injectable } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Geral } from '../../model/geral';

@Injectable()
export class ArquivoInstituicaoService extends Geral{
    myAppUrl: string = "";

    constructor(private _http: Http) {
        super();
        this.myAppUrl = this.sUrl;
    }

    getArquivoInstituicoes() {
        return this._http.get(this.myAppUrl + 'ArquivoInstituicao/')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getArquivoInstituicaoById(id: number) {
        return this._http.get(this.myAppUrl + "ArquivoInstituicao/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    addArquivoInstituicao(fileToUpload: any, IDInstituicao: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
        input.append("IDInstituicao", IDInstituicao);

        return this._http
            .post(this.myAppUrl + "ArquivoInstituicao", input)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }


    deleteArquivoInstituicao(id: number) {
        return this._http.delete(this.myAppUrl + "ArquivoInstituicao/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    download(id: number) {
        return this._http.get(this.myAppUrl + "ArquivoInstituicao/" + id, { responseType: ResponseContentType.Blob }).map(
            (res) => {
                return new Blob([res.blob()], { type: 'application/pdf' })
            });
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }


}

