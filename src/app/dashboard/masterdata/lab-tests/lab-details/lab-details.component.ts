import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';


  constructor(
    private _labtestService: LabTestService,
      private _activatedRoute: ActivatedRoute,
      private _formbuilder: FormBuilder

  ) {
     this._activatedRoute.params.subscribe((data:any)=>{
      if(data.id){
        this.isEdit=true;
        this.id=data.id;
        _labtestService.getTestDetails(data.id).subscribe((data:any)=>{
          this.labForm.patchValue(data);
        });
        console.log(this.id)
      }
     });
}
public labForm:FormGroup=new FormGroup({
  lab_test:new FormControl(),
  material:new FormControl(),
  size:new FormControl(),
  image:new FormControl(),
});
 ngOnInit() {
  this.labForm = this._formbuilder.group({
    lab_test: [''],
    material: [''],
    size: [''],
    image: [''],
  })
 }
 uploadFile(evt: any) {
 
  this.files1 = evt.target.files;
  const file = this.files1[0];
  this.file2 = this.files1[0].name;
  const fileSize = this.files1[0].size;
  if (fileSize >= 1084) {
  }
  if (this.files1 && file) {
    const reader = new FileReader();
    reader.onload = this._handleReaderLoaded1.bind(this);
    reader.readAsBinaryString(file);
  }
}

_handleReaderLoaded1(readerEvt: any) {
  const binaryString = readerEvt.target.result;
  this.base64textString = btoa(binaryString);
  this.bas2 = 'data:text/html;base64,' + this.base64textString;
  this.bas2 = this.bas2.substring(this.bas2.indexOf(',') + 1);
}

submit(){
  console.log(this.id)
  if(this.isEdit){
    this._labtestService.updateTestDetails(this.labForm.value,this.id).subscribe(
      (data:any)=>{
        alert('updated successfully');
      },
      (err:any)=>{
        alert('internal server error')
      }
    );

  }
  else{

    const data = 
      {
        "lab_test": this.labForm.get('lab_test')?.value,
        "material": this.labForm.get('material')?.value,
        "size": this.labForm.get('size')?.value,
        "image": this.bas2
      }
    console.log(data)
    this._labtestService.createTestDetails(data).subscribe(
      (data:any)=>{
        alert('test results created successfully');
      },
      (err:any)=>{
        alert('internal server err');
      }
    );
  }
  console.log(this.labForm.value);
}
}
