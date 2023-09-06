import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';
import { ViewSitesComponent } from './view-sites/view-sites.component';
import { StudySiteacknowledgementComponent } from './study-siteacknowledgement/study-siteacknowledgement.component';

const routes: Routes = [
  {path:'sampleCollection/:id', component:SampleCollectionComponent},
  {path:'viewCRA', component:ViewSitesComponent},
  {path:'viewCRAAcknowledgement', component:ViewSitesComponent},
  {path:'studySiteAcknowledgement/:id', component:StudySiteacknowledgementComponent}
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
