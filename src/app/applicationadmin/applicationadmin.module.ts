import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationadminRoutingModule } from './applicationadmin-routing.module';
import { CROcreateComponent } from './crocreate/crocreate.component';
import { UserCreateComponent } from './user-create/user-create.component';


@NgModule({
  declarations: [
    CROcreateComponent,
    UserCreateComponent
  ],
  imports: [
    CommonModule,
    ApplicationadminRoutingModule
  ]
})
export class ApplicationadminModule { }
