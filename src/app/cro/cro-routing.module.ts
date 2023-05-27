import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SponsorComponent } from './sponsor/sponsor.component';
import { SiteComponent } from './site/site.component';
import { LabTestComponent } from './lab-test/lab-test.component';
import { ProtocolRegistrationComponent } from './protocol-registration/protocol-registration.component';

const routes: Routes = [
  {path:'csponsor', component:SponsorComponent},
  {path:'site', component:SiteComponent},
  {path:'labTest', component:LabTestComponent},
  {path:'cprotocol', component:ProtocolRegistrationComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CRORoutingModule { }
