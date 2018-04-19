import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './guard/guard';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { InstituicaoComponent } from './component/instituicao/instituicao.component';
import { ProjetoComponent } from './component/projeto/projeto/projeto.component';
import { ProjetoListComponent } from './component/projeto/projeto-list/projeto-list.component';
import { ForgotComponent } from './component/forgot/forgot.component';
import { ChangerpasswordComponent } from './component/changerpassword/changerpassword.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'projeto-list', component: ProjetoListComponent, canActivate: [AuthGuard] },
  { path: 'projeto/edit/:id', component: ProjetoComponent, canActivate: [AuthGuard] },
  { path: 'projeto', component: ProjetoComponent, canActivate: [AuthGuard] },
  { path: 'instituicao', component: InstituicaoComponent, canActivate: [AuthGuard] },  
  { path: 'instituicao-new', component: InstituicaoComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'changerpassword/:cnpj', component: ChangerpasswordComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }