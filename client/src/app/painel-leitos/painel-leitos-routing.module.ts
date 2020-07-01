import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {AuthGuard} from "../core/guards/auth.guard";
import {PainelLeitosComponent} from "./painel-leitos.component";

const painelLeitosRouting: Routes = [{
  path: 'painel-leitos',
  component: PainelLeitosComponent,
  canActivate: [AuthGuard]
}]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(painelLeitosRouting)
  ]
})
export class PainelLeitosRoutingModule {
}
