import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Http } from '@angular/http';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  versaoDesenv: any;

  constructor(private authService: AuthService, private router: Router, private _http: Http) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this._http.get('assets/appsettings.json')
     .subscribe(res => {
       this.versaoDesenv = res.json().versaoDesenv;
      });
  }

  onLogout() {
    const ans = confirm('Você deseja sair do sistema?');
    if (ans) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }

  instituicao() {
    this.router.navigate(['/instituicao']);
  }

  projeto() {
    this.router.navigate(['/projeto-list']);
  }

  home() {
    this.router.navigate(['/']);
  }
}
