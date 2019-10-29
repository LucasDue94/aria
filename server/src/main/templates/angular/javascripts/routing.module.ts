import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListComponent} from './${propertyName}-list.component';
import {ShowComponent} from './${propertyName}-show.component';
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
    {
        path: '${propertyName}', canActivate: [AuthGuard], children: [
            {path: '', redirectTo: 'list', pathMatch: 'full'},
            {path: 'list', component: ${className}ListComponent},
            {path: 'create', component: ${className}CreateComponent},
            {path: 'edit/:id', component: ${className}EditComponent},
            {path: 'show/:id', component: ${className}ShowComponent}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ${className}
RoutingModule {
}