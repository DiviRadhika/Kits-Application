import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { CROcreateComponent } from './crocreate/crocreate.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { CroGridComponent } from './cro-grid/cro-grid.component';

const routes: Routes = [
  {path:'userCreate', component:UserCreateComponent},
  {path:'userUpdate/:id', component:UserCreateComponent},
  {path:'croCreate', component:CROcreateComponent},
  {path:'croUpdate/:id', component:CROcreateComponent},
  {path:'userGrid', component:UserGridComponent},
  {path:'croGrid', component:CroGridComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationadminRoutingModule { }
