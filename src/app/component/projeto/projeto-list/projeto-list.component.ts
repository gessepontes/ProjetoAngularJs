import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../../../service/projeto/projeto.service'
import { MensagemService } from '../../../service/mensagem/mensagem.service';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
    selector: 'projeto-list',
    templateUrl: './projeto-list.component.html',
    styleUrls: ['./projeto-list.component.scss']
})

export class ProjetoListComponent {
    public projetoList: any;
    ativoprazo: boolean = false;
    user;

    constructor(public http: Http, private _router: Router, private alertService: MensagemService,
        private _projetoService: ProjetoService,private authenticationService: AuthService) {
            
             this.user = localStorage.getItem('currentUser');
            if (this.user != null) {
              this.getProjetos(JSON.parse(this.user).id);
              this.prazo();
            }
    }

    getProjetos(id) {
        this._projetoService.getProjetoByIdInstituicao(id).subscribe(
            data => this.projetoList = data
        )
    }

    delete(id: number) {
        var ans = confirm("Você que excluir este projeto?");
        if (ans) {
            this._projetoService.deleteProjeto(id).subscribe((data) => {
                if (data == 0) {
                    this.alertService.error("Erro ao realizar a operação!");
                } else {
                    this.alertService.success("Operação realizada com sucesso!");
                    this.getProjetos(JSON.parse(this.user).id);
                }
            }, error => console.error(error))
        }
    }

    newProjeto(){
      this._router.navigate(['projeto']);
    }

    prazo(){
        this.authenticationService.prazo().subscribe(
          data => {
            if (data) {
              this.ativoprazo = true;
            } 
          },
          error => {
            this.alertService.error("Erro ao realizar a operação!");
          });
      }
}