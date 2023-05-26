import { Component } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LabDetailsComponent } from './lab-details/lab-details.component';
import { LabTestService } from 'src/app/Services/LAB-TEST/lab-test.service';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-lab-tests',
  templateUrl: './lab-tests.component.html',
  styleUrls: ['./lab-tests.component.css']
})
export class LabTestsComponent {
  displayedColumns= ['lab_test','material','size', 'image']
public bsModalRef!:BsModalRef;
  labValues: any;
  labTableValues: any;
  file: any;
  slash: any;
  public bytes: any = '';
  base64String: string ='';
  image: string =''
constructor(
  private modalService:BsModalService, private _labtestService:LabTestService){
    this.getlab();
  
  }

create(){
  this.bsModalRef=this.modalService.show(LabDetailsComponent)
}  

ngOnInIt(){
  

}
 
         

   
  
getlab(){
 
  this._labtestService.getLabTests().subscribe((res=>{
    console.log(res)
    this.labValues = res
    const ELEMENT_DATA: PeriodicElement[] = this.labValues;
    this.labTableValues = new MatTableDataSource(ELEMENT_DATA);
    console.log(this.labTableValues)
  })
  )};
}
export interface PeriodicElement{
  lab_test: string;
  material: string;
  size: string;
  lab_id:string;
}



