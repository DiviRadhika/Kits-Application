import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';
import { ViewSitesComponent } from './view-sites/view-sites.component';

const routes: Routes = [
  {path:'sampleCollection/:id', component:SampleCollectionComponent},
  {path:'viewCRA', component:ViewSitesComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
