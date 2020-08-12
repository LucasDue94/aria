import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PainelCirurgicoComponent } from './painel-cirurgico/painel-cirurgico.component';
import {PainelCirurgicoRoutingModule} from "./painel-cirurgico-routing.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";



@NgModule({
  declarations: [PainelCirurgicoComponent],
  imports: [
    CommonModule,
    PainelCirurgicoRoutingModule,
    FontAwesomeModule
  ]
})
export class PainelCirurgicoModule { }
