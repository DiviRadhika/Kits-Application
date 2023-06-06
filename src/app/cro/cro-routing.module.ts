import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SiteComponent } from './site/site.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ProtocolRegistrationComponent} from './protocol-registration/protocol-registration.component';
import { SponsorGridComponent } from './sponsor-grid/sponsor-grid.component';
import { AddSiteComponent } from './add-site/add-site.component';
import { LabCreateComponent } from './lab-create/lab-create.component';


const routes: Routes = [
 
  {path:'siteGrid', component:SiteComponent},
  {path: 'addSite', component:AddSiteComponent},
  {path: 'updateSite/:id', component:AddSiteComponent},

  {path:'labTestGrid', component:LabTestComponent},
  {path: 'createLabTest', component:LabCreateComponent},
  {path:'updateLabTest/:id', component:LabCreateComponent},

  {path:'csponsor', component:SponsorComponent},
  {path:'sponsorGrid', component:SponsorGridComponent},
  {path:'csponsorUpdate/:id', component:SponsorComponent},

  {path:'protocolRegistration', component:ProtocolRegistrationComponent},
 


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRORoutingModule { }
