import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {ErrorComponent} from "./error/error.component";
import {MainComponent} from "./main/main.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'error', component: ErrorComponent},
  {path: 'main', component: MainComponent},
  // {path: 'forgot', component: ForgotComponent},
  // {path: 'redefinesenha/:id/:hash', component: RedefineSenhaComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
