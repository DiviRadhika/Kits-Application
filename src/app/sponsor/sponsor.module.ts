import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorRoutingModule } from './sponsor-routing.module';
import { ProtocalComponent } from './protocal/protocal.component';
import { SponsorStudyComponent } from './sponsor-study/sponsor-study.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TabViewModule } from 'primeng/tabview';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProtocalComponent,
    SponsorStudyComponent
  ],
  imports: [
    CommonModule,
    SponsorRoutingModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class SponsorModule { }
