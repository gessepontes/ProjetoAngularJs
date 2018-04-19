import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, Validators, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProjetoListComponent } from '../projeto-list/projeto-list.component';
import { CidadeService } from '../../../service/cidade/cidade.service'
import { ProjetoService } from '../../../service/projeto/projeto.service'
import { MensagemService } from '../../../service/mensagem/mensagem.service';
import { ArquivoProjetoService } from '../../../service/arquivoprojeto/arquivoprojeto.service'
import { saveAs } from 'file-saver';
import { AuthService } from '../../../service/auth/auth.service';

@Component({
  selector: 'projeto',
  templateUrl: './projeto.component.html',
  styleUrls: ['./projeto.component.scss']
})

export class ProjetoComponent implements OnInit {
  @ViewChild("fileInput") fileInput: any;
  projetoForm: FormGroup;
  title: string = "Novo Projeto";
  id: number;
  idInstituicao: number;
  errorMessage: any;
  cidades: any;
  aArea: number[] = [];
  arquivoProjeto: any;

  areas = [
    {
      id: 1,
      nome: 'Meio Ambiente'
    },
    {
      id: 2,
      nome: 'Consumidor'
    },
    {
      id: 3,
      nome: 'Defesa da Concorrencia'
    },
    {
      id: 4,
      nome: 'Artístico'
    },
    {
      id: 5,
      nome: 'Estético'
    },
    {
      id: 6,
      nome: 'Histórico'
    },
    {
      id: 7,
      nome: 'Turístico'
    },
    {
      id: 8,
      nome: 'Paisagismo'
    },
    {
      id: 9,
      nome: 'Direitos Difusos'
    },
    {
      id: 10,
      nome: 'Reaparelhamento e modernização do ministério público do estado do ceará e órgãos estaduais de execução e de apoio.'
    }
  ]

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.projetoForm.value); }
  ativoprazo: boolean = false;

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, private _cidadeService: CidadeService,
    private alertService: MensagemService, private _arquivoProjetoService: ArquivoProjetoService,private authenticationService: AuthService,
    private _projetoService: ProjetoService, private router: Router) {
    
    if (this._avRoute.snapshot.params["id"]) {
       this.id = this._avRoute.snapshot.params["id"];
       this.prazo();
    }else{
      this.id = 0;
    }

    this.getCidadeByIdEstado(6);

    let user = localStorage.getItem('currentUser');

    if (user != null) {
      this.idInstituicao = JSON.parse(user).id;
    }

  }

  getCidadeByIdEstado(id: number) {
    this._cidadeService.getCidadeByIdEstado(id)
      .subscribe(data => this.cidades = data
        , error => this.errorMessage = error);
  }

  sArea(id: number) {
    if (this.aArea.find(x => x === id)) {
      const index: number = this.aArea.indexOf(id);
      if (index !== -1) {
        this.aArea.splice(index, 1);
      }
    } else {
      this.aArea.push(id);
    }

    this.projetoForm.value.sArea = this.aArea;
  }


  ngOnInit() {

    this.projetoForm = this._fb.group({
      id: '0',
      idInstituicao: '0',
      sTitulo: ['', Validators.required],
      dDataInicio: ['', Validators.required],
      dDataTermino: ['', Validators.required],
      mValor: ['', Validators.required],
      mValorContraPartida: ['', Validators.required],
      tResumo: ['', Validators.required],
      idCidade: ['', Validators.required],
      sArea: null,
      arquivoProjeto: null
    });

    if (this.idInstituicao > 0) {
      if (this.id > 0) {
        this.getProjetoById(this.id);
      }
    } else {
      alert("É necessário a criação de uma instituição para a criação de um projeto!");
      this.router.navigate(['/projeto-list']);
    }
  }

  getProjetoById(id: number) {

    this.title = "Editar Projeto";

    this._projetoService.getProjetoById(id)
      .subscribe((data) => {

        data.dDataInicio = data.dDataInicio.substr(0, 10);
        data.dDataTermino = data.dDataTermino.substr(0, 10);

        this.projetoForm.patchValue(data, { onlySelf: true });
        this.aArea = this.projetoForm.value.sArea;

        if(this.projetoForm.value.arquivoProjeto[0] != null){
          this.arquivoProjeto = this.projetoForm.value.arquivoProjeto;
        } else{
          this.arquivoProjeto = null;
        }       
      }
        , error => this.alertService.error(error));
  }

  addProjeto() {
    this._projetoService.addProjeto(this.projetoForm.value)
      .subscribe((data) => {
        if (data == 0) {
          this.alertService.error("Erro ao realizar a operação!");
        } else {
          this.alertService.success("Operação realizada com sucesso!");
          this.router.navigate(['/projeto-list']);
        }
      }, error => this.alertService.error(error))
  }

  updateProjeto() {
    this._projetoService.updateProjeto(this.projetoForm.value)
      .subscribe((data) => {
        if (data == 0) {
          this.alertService.error("Erro ao realizar a operação!");
        } else {
          this.alertService.success("Operação realizada com sucesso!");
          this.router.navigate(['/projeto-list']);
        }
      }, error => this.alertService.error(error))
  }

  save() {

    this.projetoForm.value.IDInstituicao = this.idInstituicao;
    this.projetoForm.value.sArea = this.aArea;

    if (this.projetoForm.value.id == 0) {
      this.addProjeto();
    }
    else {
      this.updateProjeto();
    }
  }

  cancel() {
    this.router.navigate(['/projeto-list']);
  }

  addFile(): void {
    let fi = this.fileInput.nativeElement;

    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      let sizeFile = Math.round(fileToUpload.size / 1024);

      if (sizeFile > 1024) {
        alert("Tamanho maximo para o arquivo é de 1mb!");
        return;
      }

      if (fileToUpload.type != 'application/pdf') {
        alert("O sistema aceita apenas arquivos PDF!");
        return;
      }

      this._arquivoProjetoService
        .addArquivoProjeto(fileToUpload, this.projetoForm.value.id)
        .subscribe(data => {
          if (data == 0) {
            this.alertService.error("Erro ao realizar a operação!");
          } else {
            this.alertService.success("Operação realizada com sucesso!");
            this.getProjetoById(this.projetoForm.value.id);
          }
        }, error => this.alertService.error(error));


    } else {
      alert("Selecione algum arquivo!");
    }
  }

  download(id: number, filename: string) {
    this._arquivoProjetoService
      .download(id).subscribe(data => {
        saveAs(data, filename);
      });
  }

  delete(id: number) {

    var ans = confirm("Você deseja excluir este arquivo?");
    if (ans) {
      this._arquivoProjetoService
        .deleteArquivoProjeto(id)
        .subscribe(data => {
          if (data == 0) {
            this.alertService.error("Erro ao realizar a operação!");
          } else {
            this.alertService.success("Operação realizada com sucesso!");
            this.getProjetoById(this.projetoForm.value.id);
          }
        }, error => this.alertService.error(error));
    }
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