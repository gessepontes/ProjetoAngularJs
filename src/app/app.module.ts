import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy, DatePipe } from '@angular/common';

import { MaterializeModule  } from 'angular2-materialize';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';

import { AuthGuard } from './guard/guard';
import { AuthService } from './service/auth/auth.service';
import { InstituicaoService } from './service/instituicao/instituicao.service';
import { EstadoService } from './service/estado/estado.service';
import { CidadeService } from './service/cidade/cidade.service';
import { MensagemService } from './service/mensagem/mensagem.service';
import { ArquivoService } from './service/arquivo/arquivo.service';
import { ProjetoService } from './service/projeto/projeto.service';
import { HttpClient } from './service/httpclient';
import { PagerService } from './service/pager.service';

import { AppComponent } from './component/app/app.component';
import { InstituicaoComponent } from './component/instituicao/instituicao.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { HeaderComponent } from './component/header/header.component';
import { ProjetoComponent } from './component/projeto/projeto/projeto.component';
import { ProjetoListComponent } from './component/projeto/projeto-list/projeto-list.component';
import { MensagemComponent } from './component/mensagem/mensagem.component';
import { ChangerpasswordComponent } from './component/changerpassword/changerpassword.component';
import { ForgotComponent } from './component/forgot/forgot.component';

import { AppRoutingModule } from './app-routing.module';

import { KzMaskDirective } from './directive/masked-input/kz-mask-directive';
import { KzMaskCurrencyDirective } from './directive/masked-input/kz-mask-currency-directive';

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
    BrowserModule, HttpModule, HttpClientModule, NgHttpLoaderModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule ,
    MaterializeModule
  ],
  providers: [AuthService, AuthGuard, InstituicaoService, PagerService, {provide: LocationStrategy, useClass: HashLocationStrategy},
    EstadoService, CidadeService, DatePipe,
    MensagemService, ArquivoService, ProjetoService, HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
