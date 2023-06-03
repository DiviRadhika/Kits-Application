import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CROcreateComponent } from './crocreate/crocreate.component';
import { UserCreateComponent } from './user-create/user-create.component';
import { CroGridComponent } from './cro-grid/cro-grid.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApplicationadminRoutingModule } from './applicationadmin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';



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
    HttpClientModule,
    NgxPaginationModule
  ]
})
export class ApplicationadminModule { }
