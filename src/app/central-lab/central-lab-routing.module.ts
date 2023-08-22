import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KitPreprationComponent } from './kit-prepration/kit-prepration.component';
import { KitVerificationComponent } from './kit-verification/kit-verification.component';
import { SampleAcknowledgementComponent } from './sample-acknowledgement/sample-acknowledgement.component';
import { UploadResultsComponent } from '../central/upload-results/upload-results.component';
import { KitDistributionComponent } from './kit-distribution/kit-distribution.component';
import { SampleReportsComponent } from './sample-acknowledgement/sample-reports/sample-reports.component';
import { PreprationGridComponent } from './prepration-grid/prepration-grid.component';
import { KitPreprationEditComponent } from './kit-prepration-edit/kit-prepration-edit.component';

const routes: Routes = [
  {path:'kitPrepration/:id/:mode', component:KitPreprationComponent},
  {path:'kitVerification', component:KitVerificationComponent},
  {path:'kitDistribution', component:KitDistributionComponent},
  {path:'sampleAcknowledgement', component:SampleAcknowledgementComponent},
  {path:'sampleReports', component:SampleReportsComponent},
  {path:'kitPreparationGrid', component:PreprationGridComponent},
  {path:'kitpreprationedit/:id', component:KitPreprationEditComponent},
  


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CentralLabRoutingModule { }
