import { Component } from '@angular/core';
import { Spinkit } from 'ng-http-loader/spinkits';
import { Http } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  public spinkit = Spinkit;

  constructor(private _http: Http) {
    this._http.get('assets/appsettings.json')
    .subscribe(res => {
        localStorage.setItem('sUrl',  res.json().defaultUrl);
    });
}  
}
