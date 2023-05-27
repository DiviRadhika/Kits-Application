import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitPreprationComponent } from './kit-prepration/kit-prepration.component';
import { KitVerificationComponent } from './kit-verification/kit-verification.component';
import { SampleAcknowledgementComponent } from './sample-acknowledgement/sample-acknowledgement.component';
import { UploadResultsComponent } from '../central/upload-results/upload-results.component';

const routes: Routes = [
  {path:'kitPrepration', component:KitPreprationComponent},
  {path:'kitVerification', component:KitVerificationComponent},
  {path:'sampleAcknowledgement', component:SampleAcknowledgementComponent},
  {path:'upload', component:UploadResultsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralLabRoutingModule { }
