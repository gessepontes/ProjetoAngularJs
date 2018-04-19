import { Injectable, Inject } from '@angular/core';
import { Http, Response, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Geral} from '../../model/geral';

@Injectable()
export class ArquivoProjetoService extends Geral{
    myAppUrl: string = "";

    constructor(private _http: Http) {
      super();
      this.myAppUrl = this.sUrl;
    }

    getArquivoProjeto() {
        return this._http.get(this.myAppUrl + 'ArquivoProjeto/')
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    getArquivoProjetoById(id: number) {
        return this._http.get(this.myAppUrl + "ArquivoProjeto/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler)
    }

    addArquivoProjeto(fileToUpload: any, IDProjeto: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
        input.append("IDProjeto", IDProjeto);

        return this._http
            .post(this.myAppUrl + "ArquivoProjeto", input)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);

    }


    deleteArquivoProjeto(id: number) {
        return this._http.delete(this.myAppUrl + "ArquivoProjeto/" + id)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    download(id: number) {
        return this._http.get(this.myAppUrl + "ArquivoProjeto/" + id, { responseType: ResponseContentType.Blob }).map(
            (res) => {
                return new Blob([res.blob()], { type: 'application/pdf' })
            });
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }


}

