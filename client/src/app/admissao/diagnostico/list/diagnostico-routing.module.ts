import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiagnosticoListComponent} from './diagnostico-list.component';
import {CommonModule} from '@angular/common';

const diagnosticoRouting: Routes = [
  {
    path: 'diagnostico',
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'full'},
      {path: 'list', component: DiagnosticoListComponent},
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(diagnosticoRouting)
  ]
})
export class DiagnosticoRoutingModule {}

