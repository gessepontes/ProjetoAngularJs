import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MensagemService } from '../../service/mensagem/mensagem.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formUser: FormGroup;

  constructor(
    private fb: FormBuilder, private router: Router,
    private authService: AuthService, private alertService: MensagemService,
  ) { }

  ngOnInit() {
    this.formUser = this.fb.group({
      cnpj: ['', Validators.required],
      password: ['', Validators.required]
    });

    localStorage.removeItem('currentUser');
  }

  login() {
    if (this.formUser.valid) {
      this.authService.login(this.formUser.value.cnpj, this.formUser.value.password).subscribe(
        data => {
          if (data == undefined) {
            this.alertService.error("Cnpj ou senha não conferem!");
          } else {
            this.router.navigate(['/']);
          }
        },
        error => {
          this.alertService.error("Erro ao realizar a operação!");
        });
    }
  }

  prazo() {
    this.authService.prazo().subscribe(
      data => {
        return data;
      },
      error => {
        this.alertService.error("Erro ao realizar a operação!");
      });
  }


  forgot(){
    this.router.navigate(['/forgot']);
  }

  newInstituicao() {
    this.authService.prazo().subscribe(
      data => {
        if (data) {
          this.router.navigate(['/instituicao-new']);
        } else {
          this.alertService.error("No momento não está no período hábio para a criação de novas instituições!");
        }
      },
      error => {
        this.alertService.error("Erro ao realizar a operação!");
      });
  }
}