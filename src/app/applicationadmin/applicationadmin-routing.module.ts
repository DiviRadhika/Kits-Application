import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationadminRoutingModule } from './applicationadmin-routing.module';
import { CROcreateComponent } from './crocreate/crocreate.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { CroGridComponent } from './cro-grid/cro-grid.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    CROcreateComponent,
    UserCreateComponent,
    CroGridComponent,
    UserGridComponent
  ],
  imports: [
    CommonModule,
    ApplicationadminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class ApplicationadminModule { }
