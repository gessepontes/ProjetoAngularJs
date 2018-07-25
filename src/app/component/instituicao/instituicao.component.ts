import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { InstituicaoService } from '../../service/instituicao/instituicao.service';
import { ArquivoService } from '../../service/arquivo/arquivo.service';
import { AuthService } from '../../service/auth/auth.service';
import { MensagemService } from '../../service/mensagem/mensagem.service';
import { SpinnerVisibilityService } from 'ng-http-loader/services/spinner-visibility.service';
import { Observable } from 'rxjs/Observable';

import { saveAs } from 'file-saver';
import { Estados } from '../../models/iestados.model';
import { Cidades } from '../../models/icidades.model';
import { DropdownService } from '../../service/dropdown.service';
import { Diversos } from '../../models/idiversos.model';

@Component({
  selector: 'instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css']
})

export class InstituicaoComponent implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  @ViewChild('textInput') textInput: any;
  instituicaoForm: FormGroup;
  private formSubmitAttempt: boolean;
  title: string = 'Nova instituição';
  id: number;
  idCidade: number;
  arquivoInstituicao: any;
  ativo: boolean = false;
  ativoprazo: boolean = false;
  displayedColumns = ['sNome'];
  estados: Observable<Estados>;
  cidades: Observable<Cidades>;
  regimes: Observable<Diversos[]>;
  esferas: Observable<Diversos[]>;
  naturezas: Observable<Diversos[]>;

  submitted = false;

  onSubmit() { this.submitted = true; }

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _instituicaoService: InstituicaoService, private alertService: MensagemService,
    private _dropdownService: DropdownService,
    private _arquivoService: ArquivoService, private authenticationService: AuthService,
    private spinner: SpinnerVisibilityService,
    private _router: Router) {

    spinner.show();
    this.estados = this._dropdownService.getEstados();

    const user = localStorage.getItem('currentUser');
    
    if (user !== null) {
      this.id = JSON.parse(user).id;
      this.idCidade = JSON.parse(user).idCidade;
      this.ativo = true;
    } else {
      this.id = 0;
      this.ativo = false;
    }

    this.prazo();

  }

  ngOnInit() {
    this.instituicaoForm = this._fb.group({
      id: '0',
      sProponente: ['', Validators.required],
      sCNPJ: ['', Validators.required],
      sEndereco: ['', Validators.required],
      sCep: ['', Validators.required],
      sTelefone: ['', Validators.required],
      sFax: [''],
      idEstado: 0,
      idCidade: ['', Validators.required],
      sEmail: ['', Validators.required],
      sHomePage: ['http://'],
      iRegime: ['', Validators.required],
      iEsfera: ['', Validators.required],
      iNatureza: ['', Validators.required],
      sRepresentante: ['', Validators.required],
      sCpfRepresentante: ['', Validators.required],
      sCargo: ['', Validators.required],
      sFuncao: ['', Validators.required],
      sRG: ['', Validators.required],
      sOrgaoExpedidor: ['', Validators.required],
      sEnderecoRepresentante: ['', Validators.required],
      sTelefoneRepresentante:'',
      sCepRepresentante: ['', Validators.required],
      sCoordenador: ['', Validators.required],
      sCPFCoordenador: ['', Validators.required],
      sTelefoneCoordenador: '',
      arquivo: null,
      sSenha: '',
      sConfirmaSenha: '',
      sCelularRepresentante : '',
      sCelularCoordenador : ''
    });

    this.regimes = this._dropdownService.getRegimes();
    this.esferas = this._dropdownService.getEsferas();
    this.naturezas = this._dropdownService.getNaturezas();

    if (this.id > 0) {
      this.title = "Editar instituição";
      this.getInstituicao(this.id);
    }else{
      this.spinner.hide();
    }
  }

  getCidadeByIdEstado(id: number, tipo: boolean) {
    this._dropdownService.getCidadeByIdEstado(id)
      .subscribe(data => {
        this.cidades = data;

        if (tipo) {
          this.instituicaoForm.value.idCidade = '';
        }
      }
        , error => this.errorHandler(error));
  }

  getInstituicao(id: number) {
    this._instituicaoService.getInstituicaoById(id)
      .subscribe((data) => {

        data.sSenha = '';
        this.instituicaoForm.patchValue(data, { onlySelf: true });

        if(this.instituicaoForm.value.arquivo[0] != null){
          this.arquivoInstituicao = this.instituicaoForm.value.arquivo;
        } else{
          this.arquivoInstituicao = null;
        }

        this.getCidadeByIdEstado(this.instituicaoForm.value.idEstado, false);

        this.spinner.hide();
      }
        , error => this.errorHandler(error));
  }

  errorHandler(error: Response) {

    this.spinner.hide();
    
    if(error.status == 401){
        this.alertService.error('Sua sessão expirou entre novamente com seu usuário.');
        this.authenticationService.logout();  
        this._router.navigate(['/login']);
      }else{
        this.alertService.error('Erro ao realizar a operação!');
      }
  }

  testSenha() {

    let teste = true;
    const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (this.instituicaoForm.value.sSenha == '' && this.instituicaoForm.value.id == 0) {
      alert('A senha é um campo obrigatório.');
      teste = false;
    }

    if (this.instituicaoForm.value.sSenha != '') {
      if (this.instituicaoForm.value.sSenha != this.instituicaoForm.value.sConfirmaSenha) {
        alert('A senha e a confimação da senha não são iguais.');
        return false;
      } else {
        if (!pattern.test(this.instituicaoForm.value.sSenha)) {
          alert('A senha precisa ter no minimo 8 caracteres e ser composta de letras e números.');
          teste = false;
        }
      }
    } else {
      if (this.instituicaoForm.value.id == 0) {
        this.alertService.error('Senha é um campo abrigatório!');
        teste = false;

      } else {
        teste = true;
      }
    }

    return teste;
  }

  addInstituicao() {
    this._instituicaoService.addInstituicao(this.instituicaoForm.value)
      .subscribe((data) => {
        if (data == 0) {
          this.alertService.error('Erro ao realizar a operação!');
        } else {
          this.authenticationService.login(this.instituicaoForm.value.sCNPJ,this.instituicaoForm.value.sSenha)
            .subscribe(
              data => {
                this.alertService.success('Operação realizada com sucesso!');
                this._router.navigate(['/']);
              },
              error => {
                this.alertService.error('Erro ao realizar a operação!');
              });
        }
      }, error => this.errorHandler(error));
  }

  updateInstituicao() {
    this._instituicaoService.updateInstituicao(this.instituicaoForm.value)
      .subscribe((data) => {
        if (data == 0) {
          this.alertService.error('Erro ao realizar a operação!');
        } else {
          this.alertService.success('Operação realizada com sucesso!');
        }
      },error => this.errorHandler(error));
  }

  save() {

    if (this.instituicaoForm.valid) {
      if (this.testSenha()) {
        if(this.instituicaoForm.value.idCidade === ''){
          this.alertService.error('Cidade é um campo obrigatório.');
        } else {
          if (this.instituicaoForm.value.id == 0) {
            this.getTestCnpj();            
          } else {
            this.updateInstituicao();
          }
        }
      }
    }

    this.formSubmitAttempt = true;   
  }

  getTestCnpj() {
    this._instituicaoService.getTestCnpj(this.instituicaoForm.value.sCNPJ)
      .subscribe(data => {
        if (!data) {
          this.addInstituicao();
        } else {
          this.alertService.error('Foi constatado que esse CNPJ já encontra-se cadastrado na nossa base de dados, por favor verifique a numeração.');
        }
      }
        , error => this.errorHandler(error));
  }

  addFile(): void {
    let fi = this.fileInput.nativeElement;

    if (fi.files && fi.files[0]) {
      let fileToUpload = fi.files[0];
      let sizeFile = Math.round(fileToUpload.size / 1024);

      if (sizeFile > 5120) {
        alert('Tamanho maximo para o arquivo é de 5mb!');
        return;
      }

      if (fileToUpload.type != 'application/pdf') {
        alert("O sistema aceita apenas arquivos PDF!");
        return;
      }

      if (fileToUpload.name.length > 250) {
        alert('O nome do arquivo é superior a 250 caracteres!');
        return;
      }

      this._arquivoService
        .addArquivo(fileToUpload, this.instituicaoForm.value.id,1)
        .subscribe(data => {
          if (data === 0) {
            this.alertService.error('Erro ao realizar a operação!');
          } else {
            this.alertService.success('Operação realizada com sucesso!');
            this.getInstituicao(this.instituicaoForm.value.id);
          }
        });

        this.fileInput.nativeElement.value = "";
        this.textInput.nativeElement.value = "";

    } else {
      alert('Selecione algum arquivo!');
    }
  }

  download(id: number, filename: string) {
    this._arquivoService
      .download(id,1).subscribe(data => {
        saveAs(data, filename);
      });
  }

  delete(id: number) {

    let ans = confirm('Você deseja excluir este arquivo?');
    if (ans) {
      this._arquivoService
        .deleteArquivo(id)
        .subscribe(data => {
          if (data === 0) {
            this.alertService.error('Erro ao realizar a operação!');
          } else {
            this.alertService.success('Operação realizada com sucesso!');
            this.getInstituicao(this.instituicaoForm.value.id);
          }
        });
    }
  }

  back() {
    this._router.navigate(['/']);
  }

  cancel() {
    this._router.navigate(['/home']);
  }

  prazo(){
    this.authenticationService.prazo().subscribe(
      data => {
        if (data) {
          this.ativoprazo = true;
        } 
      },
      error => {
        this.alertService.error('Erro ao realizar a operação!');
      });
  }

}