import { Component, Inject } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetoService } from '../../../service/projeto/projeto.service'
import { MensagemService } from '../../../service/mensagem/mensagem.service';
import { SpinnerVisibilityService } from 'ng-http-loader/services/spinner-visibility.service';
import { AuthService } from '../../../service/auth/auth.service';
import { PagerService } from '../../../service/pager.service';

@Component({
    selector: 'projeto-list',
    templateUrl: './projeto-list.component.html',
    styleUrls: ['./projeto-list.component.scss']
})

export class ProjetoListComponent {
    ativoprazo: boolean = false;
    admin: boolean = false;
    user;

    // array of all items to be paged
    private allItems: any[];
 
    // pager object
    pager: any = {};
 
    // paged items
    pagedItems: any[];

    constructor(public http: Http, private _router: Router, private alertService: MensagemService, private pagerService: PagerService,
        private spinner: SpinnerVisibilityService,
        private _projetoService: ProjetoService, 
        private authenticationService: AuthService) {

        spinner.show();

        this.user = localStorage.getItem('currentUser');
        if (this.user != null) {

            if (JSON.parse(this.user).cPerfil != 'A') {
                this.getProjetoByIdInstituicao(JSON.parse(this.user).id);
            }else{
                this.getProjetos();
                this.admin = true;
            }

            this.prazo();
        }
    }

    getProjetoByIdInstituicao(id) {
        this._projetoService.getProjetoByIdInstituicao(id).subscribe(
            data => {
                this.allItems = data;
 
                // initialize to page 1
                this.setPage(1);
                
                this.spinner.hide();
            },  error => this.errorHandler(error));        
    }

    getProjetos() {
        this._projetoService.getProjetos().subscribe(
            data => {
                this.allItems = data;
 
                // initialize to page 1
                this.setPage(1);
                
                this.spinner.hide();
            },  error => this.errorHandler(error));        
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
 
        // get pager object from service
        this.pager = this.pagerService.getPager(this.allItems.length, page);
 
        // get current page of items
        this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    delete(id: number) {
        var ans = confirm("Você deseja excluir este projeto?");
        if (ans) {
            this.spinner.show();

            this._projetoService.deleteProjeto(id).subscribe((data) => {
                if (data == 0) {
                    this.alertService.error("Erro ao realizar a operação!");
                } else {
                    this.alertService.success("Operação realizada com sucesso!");
                    this.getProjetoByIdInstituicao(JSON.parse(this.user).id);
                }
            },  error => this.errorHandler(error));
        }
    }

    newProjeto() {
        this._router.navigate(['projeto']);
    }

    prazo() {
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


  errorHandler(error: Response) {

    this.spinner.hide();
    
    if(error.status == 401){
        this.alertService.error("Sua sessão expirou entre novamente com seu usuário.");
        this._router.navigate(['/login']);
      }else{
        this.alertService.error("Erro ao realizar a operação!");
      }
  }
}