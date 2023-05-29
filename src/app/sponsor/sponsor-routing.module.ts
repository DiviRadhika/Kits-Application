import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProtocalComponent } from './protocal/protocal.component';

const routes: Routes = [
  {path:'protocol', component:ProtocalComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SponsorRoutingModule { }
