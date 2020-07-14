import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DiagnosticoListComponent} from "./diagnostico-list.component";
import {AuthGuard} from "../core/guards/auth.guard";

const routes: Routes = [
    {
        path: 'diagnostico', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: DiagnosticoListComponent},
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DiagnosticoRouting {
}
