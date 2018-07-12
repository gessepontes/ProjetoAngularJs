import { Component, OnInit } from '@angular/core';
import { MensagemService } from '../../service/mensagem/mensagem.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-changerpassword',
  templateUrl: './changerpassword.component.html',
  styleUrls: ['./changerpassword.component.scss']
})
export class ChangerpasswordComponent implements OnInit {
  formChanger: FormGroup;
  cnpj: string;

  get diagnostic() { return JSON.stringify(this.formChanger.value); }

  constructor(private fb: FormBuilder, private router: Router, private _avRoute: ActivatedRoute,
    private authService: AuthService, private alertService: MensagemService) {

    if (this._avRoute.snapshot.params['cnpj']) {
      this.cnpj = this._avRoute.snapshot.params['cnpj'];
    } else {
      this.cnpj = '';
    }

  }

  ngOnInit() {
    this.formChanger = this.fb.group({
      sCnpj: ['', Validators.required],
      sSenha: ['', Validators.required],
      sConfirmaSenha: ['', Validators.required]
    });

    this.getInstituicao(this.cnpj);
  }

  getInstituicao(cnpj: string) {
    this.authService.hash(cnpj)
      .subscribe((data) => {
        if (data != null) {
          this.formChanger.patchValue(data, { onlySelf: true });
        } else {
          this.alertService.error('A senha já foi modificada com este hash ou ocorreu um erro no servidor!');
          this.router.navigate(['/']);
        }
      }
        , error => this.alertService.error(error));
  }

  changerPassword() {
    if (this.testSenha()) {
      if (this.formChanger.valid) {
        this.authService.changerPassword(this.formChanger.value.sCnpj, this.formChanger.value.sSenha).subscribe(
          data => {
            if (data === 1) {
              this.alertService.error('O prazo para mudança de senha foi expirado, solicite uma nova alteração!');
            } else if (data === 2) {
              this.alertService.error('Erro ao realizar a operação!');
            } else {
              this.alertService.error('Operação realizada com sucesso!');
              this.router.navigate(['/']);
            }
          },
          error => {
            this.alertService.error('Erro ao realizar a operação!');
          });
      }
    }
  }

  testSenha() {

    let teste = true;
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (this.formChanger.value.sSenha !== this.formChanger.value.sConfirmaSenha) {
      alert('A senha e a confimação da senha não são iguais.');
      teste = false;
    } else {
      if (!pattern.test(this.formChanger.value.sSenha)) {
        alert('A senha precisa ter no minimo 8 caracteres e ser composta por letras e números sendo maiusculo e um minusculo.');
        teste = false;
      }
    }

    return teste;
  }
}
