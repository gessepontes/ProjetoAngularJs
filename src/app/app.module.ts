import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthGuard } from './guard/guard';
import { AuthService } from './service/auth/auth.service';
import { InstituicaoService } from './service/instituicao/instituicao.service'
import { EstadoService } from './service/estado/estado.service'
import { CidadeService } from './service/cidade/cidade.service'
import { MensagemService } from './service/mensagem/mensagem.service'
import { ArquivoInstituicaoService } from './service/arquivoinstituicao/arquivoinstituicao.service'
import { ArquivoProjetoService } from './service/arquivoprojeto/arquivoprojeto.service';
import { ProjetoService } from './service/projeto/projeto.service';

import { AppComponent } from './component/app/app.component';
import { InstituicaoComponent } from './component/instituicao/instituicao.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { ProjetoComponent } from './component/projeto/projeto/projeto.component';
import { ProjetoListComponent } from './component/projeto/projeto-list/projeto-list.component';
import { MensagemComponent } from './component/mensagem/mensagem.component';
import { ChangerpasswordComponent } from './component/changerpassword/changerpassword.component';

import { AppRoutingModule } from './app-routing.module';

import { KzMaskDirective } from './directive/masked-input/kz-mask-directive'
import { KzMaskCurrencyDirective } from './directive/masked-input/kz-mask-currency-directive';

import { MaterializeModule  } from 'angular2-materialize';
import { ForgotComponent } from './component/forgot/forgot.component';


@NgModule({
  declarations: [
    AppComponent,
    InstituicaoComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MensagemComponent,
    KzMaskDirective,
    KzMaskCurrencyDirective,
    ProjetoComponent,
    ProjetoListComponent,
    ForgotComponent,
    ChangerpasswordComponent           
  ],
  imports: [
    BrowserModule, HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    MaterializeModule 
  ],
  providers: [AuthService, AuthGuard, InstituicaoService,
    EstadoService, CidadeService,
    MensagemService, ArquivoInstituicaoService,ArquivoProjetoService,ProjetoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
