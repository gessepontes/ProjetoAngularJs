import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ProjetoService } from '../../../service/projeto/projeto.service'
import { MensagemService } from '../../../service/mensagem/mensagem.service';
import { SpinnerVisibilityService } from 'ng-http-loader/services/spinner-visibility.service';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
    selector: 'projeto-list',
    templateUrl: './projeto-list.component.html',
    styleUrls: ['./projeto-list.component.scss']
})

export class ProjetoListComponent {
    ativoprazo: boolean = false;
    admin: boolean = false;
    user;

    dtOptions: DataTables.Settings = {};

    // We use this trigger because fetching the list of persons can be quite long,
    // thus we ensure the data is fetched before rendering
    dtTrigger: Subject<any> = new Subject<any>();

    // array of all items to be paged
    allItems: any[];

    constructor(public http: Http, private _router: Router, private alertService: MensagemService,
        private spinner: SpinnerVisibilityService,
        private _projetoService: ProjetoService,
        private authenticationService: AuthService) {
    }

    ngOnInit(): void {
        this.spinner.show();

        this.dtOptions = {
            // Use this attribute to enable the responsive extension
            responsive: true,
            "language": {
                "emptyTable":     "Nenhum registro encontrado",
                "info":           "Mostrando de _START_ até _END_ de _TOTAL_ registros",
                "infoEmpty":      "Mostrando 0 até 0 de 0 registros",
                "infoFiltered":   "(Filtrados de _MAX_ registros)",
                "infoPostFix":    "",
                "thousands":      ",",
                "lengthMenu":     "_MENU_ resultados por página",
                "loadingRecords": "Carregando...",
                "processing":     "Processando...",
                "search":         "Pesquisar:",
                "zeroRecords":    "Nenhum registro encontrado",
                "paginate": {
                    "first":      "Primeiro",
                    "last":       "Último",
                    "next":       "Próximo",
                    "previous":   "Anterior"
                },
                "aria": {
                    "sortAscending":  ": Ordenar colunas de forma ascendente",
                    "sortDescending": ": Ordenar colunas de forma descendente"
                }
            }
            
        };

        this.user = localStorage.getItem('currentUser');
        if (this.user != null) {

            if (JSON.parse(this.user).cPerfil != 'A') {
                this.getProjetoByIdInstituicao(JSON.parse(this.user).id);
            } else {
                this.getProjetos();
                this.admin = true;
            }

            this.prazo();
        }
    }

    ngOnDestroy(): void {
        // Do not forget to unsubscribe the event
        this.dtTrigger.unsubscribe();
    }

    getProjetoByIdInstituicao(id) {
        this._projetoService.getProjetoByIdInstituicao(id).subscribe(
            data => {
                this.allItems = data;
                this.dtTrigger.next();
                this.spinner.hide();
            }, error => this.errorHandler(error));
    }

    getProjetos() {
        this._projetoService.getProjetos().subscribe(
            data => {
                this.allItems = data;
                this.dtTrigger.next();
                this.spinner.hide();
            }, error => this.errorHandler(error));
    }

    delete(id: number) {
        let ans = confirm("Você deseja excluir este projeto?");
        if (ans) {
            this.spinner.show();

            this._projetoService.deleteProjeto(id).subscribe((data) => {
                if (data == 0) {
                    this.alertService.error("Erro ao realizar a operação!");
                } else {
                    this.alertService.success("Operação realizada com sucesso!");
                    this.getProjetoByIdInstituicao(JSON.parse(this.user).id);
                }
            }, error => this.errorHandler(error));
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

        if (error.status == 401) {
            this.alertService.error("Sua sessão expirou entre novamente com seu usuário.");
            this.authenticationService.logout();
            this._router.navigate(['/login']);
        } else {
            this.alertService.error("Erro ao realizar a operação!");
        }
    }
}