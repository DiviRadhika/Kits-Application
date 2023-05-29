import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';


@NgModule({
  declarations: [
    SampleCollectionComponent
  ],
  imports: [
    CommonModule,
    SiteRoutingModule
  ]
})
export class SiteModule { }
