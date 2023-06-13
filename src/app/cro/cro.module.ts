import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CRORoutingModule } from './cro-routing.module';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SiteComponent } from './site/site.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ProtocolRegistrationComponent } from './protocol-registration/protocol-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SponsorGridComponent } from './sponsor-grid/sponsor-grid.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { LabCreateComponent } from './lab-create/lab-create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MaterialComponent } from './material/material.component';
import {PickListModule} from 'primeng/picklist';
import {ChipsModule} from 'primeng/chips';
import {MultiSelectModule} from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
import {CardModule} from 'primeng/card';
@NgModule({
  declarations: [
    SponsorComponent,
    SiteComponent,
    LabTestComponent,
    ProtocolRegistrationComponent,
    SponsorGridComponent,
    AddSiteComponent,
    LabCreateComponent,
    MaterialComponent
  ],
  imports: [

    CommonModule,
    CRORoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    PickListModule,
    ChipsModule,
    MultiSelectModule,
    DialogModule,
    CardModule
    
  ]
})
export class CROModule { }
