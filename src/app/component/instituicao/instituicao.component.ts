import { Component, OnInit, ViewChild } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { InstituicaoService } from '../../service/instituicao/instituicao.service'
import { EstadoService } from '../../service/estado/estado.service'
import { CidadeService } from '../../service/cidade/cidade.service'
import { ArquivoInstituicaoService } from '../../service/arquivoinstituicao/arquivoinstituicao.service';
import { AuthService } from '../../service/auth/auth.service';
import { MensagemService } from '../../service/mensagem/mensagem.service';


import { saveAs } from 'file-saver';

@Component({
  selector: 'instituicao',
  templateUrl: './instituicao.component.html',
  styleUrls: ['./instituicao.component.css']
})

export class InstituicaoComponent implements OnInit {
  @ViewChild("fileInput") fileInput: any;
  instituicaoForm: FormGroup;
  private formSubmitAttempt: boolean;
  title: string = "Nova instituição";
  id: number;
  idCidade: number;
  estados: any;
  cidades: any;
  arquivoInstituicao: any;
  ativo : boolean = false;
  displayedColumns = ['sNome'];

  submitted = false;

  onSubmit() { this.submitted = true; }

  regimes = [
    {
      id: 1,
      nome: 'Direito Público'
    },
    {
      id: 2,
      nome: 'Direito Privado'
    }
  ];

  esferas = [
    {
      id: 1,
      nome: 'Federal'
    },
    {
      id: 2,
      nome: 'Estadual'
    },
    {
      id: 3,
      nome: 'Municipal'
    },
    {
      id: 4,
      nome: 'Organização Ambientalista'
    },
    {
      id: 5,
      nome: 'Outros'
    }
  ];

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.instituicaoForm.value); }

  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute, 
    private _instituicaoService: InstituicaoService, private _estadoService: EstadoService, private alertService: MensagemService,
    private _arquivoInstituicaoService: ArquivoInstituicaoService, private authenticationService: AuthService,
    private _cidadeService: CidadeService, private _router: Router) {


    this.getEstado();

    let user = localStorage.getItem('currentUser');

    if (user != null) {
      this.id = JSON.parse(user).id;
      this.idCidade = JSON.parse(user).idCidade;
      this.ativo = true;
    }else{
      this.id = 0;
      this.ativo = false;
    }
  }

  ngOnInit() {
    this.instituicaoForm = this._fb.group({
      id: '0',
      sProponente: ['', Validators.required],
      sCNPJ: ['', Validators.required],
      sEndereco: ['', Validators.required],
      sCep: ['', Validators.required],
      sTelefone: ['', Validators.required],
      sFax: ['', Validators.required],
      idEstado: 0,
      idCidade: ['', Validators.required],
      sEmail: ['', Validators.required],
      sHomePage: ['http://', Validators.required],
      iRegime: ['', Validators.required],
      iEsfera: ['', Validators.required],
      sRepresentante: ['', Validators.required],
      sCpfRepresentante: ['', Validators.required],
      sCargo: ['', Validators.required],
      sFuncao: ['', Validators.required],
      sRG: ['', Validators.required],
      sOrgaoExpedidor: ['', Validators.required],
      sEnderecoRepresentante: ['', Validators.required],
      sTelefoneRepresentante: ['', Validators.required],
      sCepRepresentante: ['', Validators.required],
      sCoordenador: ['', Validators.required],
      sCPFCoordenador: ['', Validators.required],
      sTelefoneCoordenador: ['', Validators.required],
      sFaxCoordenador: ['', Validators.required],
      arquivoInstituicao: null,
      sSenha: '',
      sConfirmaSenha: ''
    });

    if (this.id > 0) {
      this.title = "Editar instituição";
      this.getInstituicao(this.id);
    }
  }

  isFieldInvalid(field: string) {
    return (
      (!this.instituicaoForm.get(field).valid && this.instituicaoForm.get(field).touched) ||
      (this.instituicaoForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  getEstado() {
    this._estadoService.getEstados()
      .subscribe(data => this.estados = data
        , error => this.alertService.error(error));
  }

  getCidadeByIdEstado(id: number, tipo: boolean) {
    this._cidadeService.getCidadeByIdEstado(id)
      .subscribe(data => {
        this.cidades = data;

        if (tipo) {
          this.instituicaoForm.value.idCidade = '';
        }
      }
        , error => this.alertService.error(error));
  }

  getInstituicao(id: number) {
    this._instituicaoService.getInstituicaoById(id)
      .subscribe((data) => {

        data.sSenha = '';
        this.instituicaoForm.patchValue(data, { onlySelf: true });

        if(this.instituicaoForm.value.arquivoInstituicao[0] != null){
          this.arquivoInstituicao = this.instituicaoForm.value.arquivoInstituicao;
        } else{
          this.arquivoInstituicao = null;
        }

        this.getCidadeByIdEstado(this.instituicaoForm.value.idEstado, false);
      }
        , error => this.alertService.error(error));
  }

  testSenha() {

    let teste = true;
    var pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    if (this.instituicaoForm.value.sSenha == '' && this.instituicaoForm.value.id == 0) {
      alert('A senha é um campo obrigatório.');
      teste = false;
    }

    if (this.instituicaoForm.value.sSenha != '') {
      if (this.instituicaoForm.value.sSenha != this.instituicaoForm.value.sConfirmaSenha) {
        alert('A senha e a confimação da senha não são iguais.');
        teste = false;
      } else {
        ///^
        //    (?=.*\d)          // should contain at least one digit
        //    (?=.*[a - z])       // should contain at least one lower case
        //    (?=.*[A - Z])       // should contain at least one upper case
        //[a - zA - Z0 - 9]{8,}   // should contain at least 8 from the mentioned characters
        //$ /

        if (!pattern.test(this.instituicaoForm.value.sSenha)) {
          alert('A senha precisa ter no minimo 8 caracteres e ser composta de letras(sendo necessário ter no minimo um caractere maiusculo e um minusculo) e números.');
          teste = false;
        }
      }
    } else {
      if (this.instituicaoForm.value.id == 0) {
        this.alertService.error("Senha é um campo abrigatório!");
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
          this.alertService.error("Erro ao realizar a operação!");
        } else {
          this.authenticationService.login(this.instituicaoForm.value.sCNPJ,this.instituicaoForm.value.sSenha)
            .subscribe(
              data => {
                this.alertService.success("Operação realizada com sucesso!");
                this._router.navigate(['/']);
              },
              error => {
                this.alertService.error("Erro ao realizar a operação!");
              });
        }
      }, error => this.alertService.error(error))
  }

  updateInstituicao() {
    this._instituicaoService.updateInstituicao(this.instituicaoForm.value)
      .subscribe((data) => {
        if (data == 0) {
          this.alertService.error("Erro ao realizar a operação!");
        } else {
          this.alertService.success("Operação realizada com sucesso!");
        }
      }, error => this.alertService.error(error))
  }

  save() {

    if (this.instituicaoForm.valid) {
      if (this.testSenha()) {
        if (this.instituicaoForm.value.id == 0) {
          this.addInstituicao();
        }
        else {
          this.updateInstituicao();
        }
      }
    }

    this.formSubmitAttempt = true;   
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

      this._arquivoInstituicaoService
        .addArquivoInstituicao(fileToUpload, this.instituicaoForm.value.id)
        .subscribe(data => {
          if (data == 0) {
            this.alertService.error("Erro ao realizar a operação!");
          } else {
            this.alertService.success("Operação realizada com sucesso!");
            this.getInstituicao(this.instituicaoForm.value.id);
          }
        });


    } else {
      alert("Selecione algum arquivo!");
    }
  }

  download(id: number, filename: string) {
    this._arquivoInstituicaoService
      .download(id).subscribe(data => {
        saveAs(data, filename);
      });
  }

  delete(id: number) {

    var ans = confirm("Você deseja excluir este arquivo?");
    if (ans) {
      this._arquivoInstituicaoService
        .deleteArquivoInstituicao(id)
        .subscribe(data => {
          if (data == 0) {
            this.alertService.error("Erro ao realizar a operação!");
          } else {
            this.alertService.success("Operação realizada com sucesso!");
            this.getInstituicao(this.instituicaoForm.value.id);
          }
        });
    }
  }

  back() {
    this._router.navigate(['/']);
  }


}