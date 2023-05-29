import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SiteComponent } from './site/site.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ProtocolRegistrationComponent } from './protocol-registration/protocol-registration.component';
import { SponsorGridComponent } from './sponsor-grid/sponsor-grid.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { LabCreateComponent } from './lab-create/lab-create.component';

const routes: Routes = [
  {path:'csponsor', component:SponsorComponent},
  {path:'site', component:SiteComponent},
  {path:'labTest', component:LabTestComponent},
  {path:'cprotocol', component:ProtocolRegistrationComponent},
  {path:'sponsorGrid', component:SponsorGridComponent},
  {path:'csponsorUpdate/:id', component:SponsorGridComponent},
  {path: 'addSite', component:AddSiteComponent},
  {path: 'updateSite/:id', component:AddSiteComponent},
  {path: 'createLabTest', component:LabCreateComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRORoutingModule { }
