import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CRORoutingModule } from './cro-routing.module';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SiteComponent } from './site/site.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ProtocolRegistrationComponent } from './protocol-registration/protocol-registration.component';


@NgModule({
  declarations: [
    SponsorComponent,
    SiteComponent,
    LabTestComponent,
    ProtocolRegistrationComponent
  ],
  imports: [
    CommonModule,
    CRORoutingModule
  ]
})
export class CROModule { }
