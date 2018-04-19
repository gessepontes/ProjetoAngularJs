import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../service/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;                

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn; 
  }

  onLogout() {
    var ans = confirm("Você deseja sair do sistema?");
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

}
