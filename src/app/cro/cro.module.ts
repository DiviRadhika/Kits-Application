import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRORoutingModule } from './cro-routing.module';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SiteComponent } from './site/site.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ProtocolRegistrationComponent } from './protocol-registration/protocol-registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SponsorGridComponent } from './sponsor-grid/sponsor-grid.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { LabCreateComponent } from './lab-create/lab-create.component';


@NgModule({
  declarations: [
    SponsorComponent,
    SiteComponent,
    LabTestComponent,
    ProtocolRegistrationComponent,
    SponsorGridComponent,
    AddSiteComponent,
    LabCreateComponent
  ],
  imports: [
    CommonModule,
    CRORoutingModule,
    ReactiveFormsModule
  ]
})
export class CROModule { }
