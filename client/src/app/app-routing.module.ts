import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './layout/login/login.component';
import {MainComponent} from './layout/main/main.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent},
  // {path: 'forgot', component: ForgotComponent},
  // {path: 'redefinesenha/:id/:hash', component: RedefineSenhaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {anchorScrolling: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
