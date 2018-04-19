import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Geral } from '../../model/geral';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService extends Geral {
    myAppUrl: string = "";

    constructor(private _http: Http) {
        super();
        this.myAppUrl = this.sUrl;
    }

    login(cnpj: string, password: string) {
        return this._http.get(this.myAppUrl + "Auth/" + cnpj + '/' + password)
            .map((response: Response) => {
                let user = response.json();

                if (user) {
                    this.loggedIn.next(true);
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    return user;
                }
            })
            .catch(this.errorHandler)
    }

    send(cnpj: string) {
        return this._http.get(this.myAppUrl + "Auth/cnpj/" + cnpj)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.errorHandler)
    }

    hash(hash: string) {
        return this._http.get(this.myAppUrl + "Auth/hash/" + hash)
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.errorHandler)
    }

    changerPassword(cnpj: string, password: string) {

        let input = new FormData();
        input.append("cnpj", cnpj);
        input.append("password", password);

        return this._http.put(this.myAppUrl + 'Auth/', input)
            .map((response: Response) => response.json())
            .catch(this.errorHandler);
    }

    private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    get isLoggedIn() {
        return this.loggedIn.asObservable();
    }

    logout() {
        // remove user from local storage to log user out
        this.loggedIn.next(false);
        localStorage.removeItem('currentUser');
    }

    errorHandler(error: Response) {
        console.log(error);
        return Observable.throw(error);
    }

    prazo() {
        return this._http.get(this.myAppUrl + "Auth/")
            .map((response: Response) => {
                return response.json();
            })
            .catch(this.errorHandler)
    }
}