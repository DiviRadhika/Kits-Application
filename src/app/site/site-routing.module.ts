import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';

const routes: Routes = [
  {path:'sampleCollection', component:SampleCollectionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
