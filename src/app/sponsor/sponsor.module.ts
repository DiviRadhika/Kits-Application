import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { ProtocalComponent } from './protocal/protocal.component';


@NgModule({
  declarations: [
    ProtocalComponent
  ],
  imports: [
    CommonModule,
    SponsorRoutingModule
  ]
})
export class SponsorModule { }
