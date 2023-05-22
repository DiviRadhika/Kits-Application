import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LabTestService } from 'src/app/Services/LAB-TEST/lab-test.service';

@Component({
  selector: 'app-lab-details',
  templateUrl: './lab-details.component.html',
  styleUrls: ['./lab-details.component.css']
})
export class LabDetailsComponent {
  public isEdit: boolean = false;
  public id: any = '';


  constructor(
    private _labtestService: LabTestService,
      private _activatedRoute: ActivatedRoute

  ) {
     this._activatedRoute.params.subscribe((data:any)=>{
      if(data.id){
        this.isEdit=true;
        this.id=data.id;
        _labtestService.getTestDetails(data.id).subscribe((data:any)=>{
          this.testForm.patchValue(data);
        });
      }
     });
}
public testForm:FormGroup=new FormGroup({
  lab_test:new FormControl(),
  material:new FormControl(),
  size:new FormControl(),
  image:new FormControl(),
});
submit(){
  if(this.isEdit){
    this._labtestService.updateTestDetails(this.testForm.value,this.id).subscribe(
      (data:any)=>{
        alert('updated successfully');
      },
      (err:any)=>{
        alert('internal server error')
      }
    );

  }
  else{
    this._labtestService.createTestDetails(this.testForm.value).subscribe(
      (data:any)=>{
        alert('test results created successfully');
      },
      (err:any)=>{
        alert('internal server err');
      }
    );
  }
  console.log(this.testForm.value);
}
}
