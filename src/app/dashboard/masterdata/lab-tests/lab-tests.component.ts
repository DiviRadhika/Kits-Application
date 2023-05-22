import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LabDetailsComponent } from './lab-details/lab-details.component';

@Component({
  selector: 'app-lab-tests',
  templateUrl: './lab-tests.component.html',
  styleUrls: ['./lab-tests.component.css']
})
export class LabTestsComponent {

public bsModalRef!:BsModalRef;
constructor(
  private modalService:BsModalService){}

create(){
  this.bsModalRef=this.modalService.show(LabDetailsComponent)
}  

}
