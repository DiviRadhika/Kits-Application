import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SponsorComponent } from './masterdata/sponsor/sponsor.component';
import { SiteComponent } from './masterdata/site/site.component';
import { CroComponent } from './masterdata/cro/cro.component';
import { LabTestsComponent } from './masterdata/lab-tests/lab-tests.component';
import { KitPreparationComponent } from './centrallab/kit-preparation/kit-preparation.component';
import { KitVerificationComponent } from './centrallab/kit-verification/kit-verification.component';
import { SampleAcknowledgmentComponent } from './centrallab/sample-acknowledgment/sample-acknowledgment.component';
import { UploadResultsComponent } from './centrallab/upload-results/upload-results.component';
import { SampleCollectionComponent } from './site/sample-collection/sample-collection.component';
import { ProtocolRegistrationComponent } from './transactiodata/protocol-registration/protocol-registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { LabDetailsComponent } from './masterdata/lab-tests/lab-details/lab-details.component';



@NgModule({
  declarations: [
    DashboardComponent,
    SponsorComponent,
    SiteComponent,
    CroComponent,
    LabTestsComponent,
    KitPreparationComponent,
    KitVerificationComponent,
    SampleAcknowledgmentComponent,
    UploadResultsComponent,
    SampleCollectionComponent,
    ProtocolRegistrationComponent,
    LabDetailsComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ModalModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DashboardModule { }
