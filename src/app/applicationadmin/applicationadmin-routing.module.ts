import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserCreateComponent } from './user-create/user-create.component';
import { CROcreateComponent } from './crocreate/crocreate.component';

const routes: Routes = [
  {path:'user', component:UserCreateComponent},
  {path:'cro', component:CROcreateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationadminRoutingModule { }
