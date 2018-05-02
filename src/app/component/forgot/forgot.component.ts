import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MensagemService } from '../../service/mensagem/mensagem.service';
import { AuthService } from '../../service/auth/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  formForgot: FormGroup;

  constructor(private fb: FormBuilder,private router: Router,
    private authService: AuthService, private alertService: MensagemService) { }

  ngOnInit() {
    this.formForgot = this.fb.group({
      cnpj: ['', Validators.required]
    });
  }

  back(){
    this.router.navigate(['/login']);
  }

  send(){
    if (this.formForgot.valid) {
      this.authService.send(this.formForgot.value.cnpj).subscribe(
        data => {
          if (data == 0) {
            this.alertService.error("Não existe este cnpj cadastrado na base de dados!");
          }
          else if (data == 2) {
            this.alertService.error("Erro ao realizar a operação!");
          }
          else {
            this.alertService.error("Operação realizada com sucesso, verifique seu email!");
            this.router.navigate(['/']);
          }
        },
        error => {
          this.alertService.error("Erro ao realizar a operação!");
        });
    }
  }
}
