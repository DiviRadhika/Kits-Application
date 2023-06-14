import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CentralLabRoutingModule } from './central-lab-routing.module';
import { KitPreprationComponent } from './kit-prepration/kit-prepration.component';
import { KitVerificationComponent } from './kit-verification/kit-verification.component';
import { SampleAcknowledgementComponent } from './sample-acknowledgement/sample-acknowledgement.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KitDistributionComponent } from './kit-distribution/kit-distribution.component';
import { SampleCollectionComponent } from './sample-collection/sample-collection.component';

import {CardModule} from 'primeng/card';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    KitPreprationComponent,
    KitVerificationComponent,
    SampleAcknowledgementComponent,
    KitDistributionComponent,
    SampleCollectionComponent
  ],
  imports: [
    CommonModule,
    CentralLabRoutingModule,
    FormsModule, 
    ReactiveFormsModule,
    CardModule,
    ButtonModule
  ]
})
export class CentralLabModule { }
