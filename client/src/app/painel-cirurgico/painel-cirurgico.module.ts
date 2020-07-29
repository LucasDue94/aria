import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelCirurgicoComponent } from './painel-cirurgico/painel-cirurgico.component';
import {PainelCirurgicoRoutingModule} from "./painel-cirurgico-routing.module";



@NgModule({
  declarations: [PainelCirurgicoComponent],
  imports: [
    CommonModule,
    PainelCirurgicoRoutingModule
  ]
})
export class PainelCirurgicoModule { }
