import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {PainelCirurgicoComponent} from "./painel-cirurgico/painel-cirurgico.component";

const painelCirurgicoRouting: Routes = [{
  path: 'painel-cirurgico',
  component: PainelCirurgicoComponent,
  canActivate: [AuthGuard]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(painelCirurgicoRouting)
  ]
})
export class PainelCirurgicoRoutingModule {
}
