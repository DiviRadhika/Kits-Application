import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentralLabRoutingModule } from './central-lab-routing.module';
import { KitPreprationComponent } from './kit-Prepration/kit-Prepration.component';
import { KitVerificationComponent } from './kit-verification/kit-verification.component';
import { SampleAcknowledgementComponent } from './sample-acknowledgement/sample-acknowledgement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitDistributionComponent } from './kit-distribution/kit-distribution.component';


import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import { SampleReportsComponent } from './sample-acknowledgement/sample-reports/sample-reports.component';
import { ToastModule } from 'primeng/toast';
import { PreprationGridComponent } from './Prepration-grid/Prepration-grid.component';
import { KitPreprationEditComponent } from './kit-Prepration-edit/kit-Prepration-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DialogModule } from 'primeng/dialog';
import { CentralSortPipe } from './centralsort';
import { CalendarModule } from 'primeng/calendar';
@NgModule({
  declarations: [
    KitPreprationComponent,
    KitVerificationComponent,
    SampleAcknowledgementComponent,
    KitDistributionComponent,
  
    SampleReportsComponent,
        PreprationGridComponent,
        KitPreprationEditComponent,
        CentralSortPipe
  ],
  imports: [
    CommonModule,
    CentralLabRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    CardModule,
    ButtonModule,
    TabViewModule,
    AccordionModule,
    ToastModule, NgxPaginationModule,
    DialogModule,CalendarModule
  ]
})
export class CentralLabModule { }
