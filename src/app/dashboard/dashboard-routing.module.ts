import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SponsorComponent } from './masterdata/sponsor/sponsor.component';
import { SiteComponent } from './masterdata/site/site.component';
import { CroComponent } from './masterdata/cro/cro.component';
import { LabTestsComponent } from './masterdata/lab-tests/lab-tests.component';
import { ProtocolRegistrationComponent } from './transactiodata/protocol-registration/protocol-registration.component';
import { KitPreparationComponent } from './centrallab/kit-preparation/kit-preparation.component';
import { KitVerificationComponent } from './centrallab/kit-verification/kit-verification.component';
import { SampleAcknowledgmentComponent } from './centrallab/sample-acknowledgment/sample-acknowledgment.component';
import { UploadResultsComponent } from './centrallab/upload-results/upload-results.component';
import { SampleCollectionComponent } from './site/sample-collection/sample-collection.component';

const routes: Routes = [
{path:'',component:DashboardComponent,children:[
  {path:'sponsor',component:SponsorComponent},
  {path:'site',component:SiteComponent},
  {path:'cro',component:CroComponent},
  {path:'lab-tests',component:LabTestsComponent},
  {path:'protocol-registration',component:ProtocolRegistrationComponent},
  {path:'kit-preparation',component:KitPreparationComponent},
  {path:'kit-verification',component:KitVerificationComponent},
  {path:'sample-acknowledgment',component:SampleAcknowledgmentComponent},
  {path:'upload-results',component:UploadResultsComponent},
  {path:'sample-collection',component:SampleCollectionComponent}
]},
{path:'',redirectTo:'/dashboard',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
