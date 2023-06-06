import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosService } from '../cros.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.css']
})
export class LabTestComponent implements OnInit {
  LabDetails: any[]= [];
  allLabDetails: any;
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText = '';
  lab: boolean = true;
  material: boolean = false;
  public labForm: FormGroup = new FormGroup({
    lab_test: new FormControl("", [Validators.required]),
  })
  labFormval: boolean = false;
  disableAdd: boolean  = true
  constructor(private route: Router, private _cro:CrosService) { }

  ngOnInit(): void {
  this.labDetailsData();
  }
  showLab(){
    this.lab = true
    this.material= false
  }
  showMat(){
    this.lab = false
    this.material= true
  }
  edit(id:any){
    this.route.navigate(['/home/cro/updateLabTest',id])
  }
  materialCreate(){
    this.route.navigate(['/home/cro/createLabTest'])

  }
  labCreate(){
    this.labFormval = true
    this.disableAdd = false

  }
  labDetailsData(){
   this._cro.getLabTests().subscribe((data:any)=>{
      console.log(data)
      this.LabDetails = data
      this.allLabDetails = data
      this.totalCount = this.LabDetails.length
    })
  }  
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.LabDetails = this.allLabDetails;
    }
    else {
      this.LabDetails = this.allLabDetails.filter(
        (labDetails: any) =>
          (labDetails.lab_test && labDetails.lab_test.toLowerCase().includes(filterValue)) ||
          (labDetails.material && labDetails.material.toLowerCase().includes(filterValue)) ||
          (labDetails.size && labDetails.size.toLowerCase().includes(filterValue))
      );
    }
  }
  submit() {

    if (this.labForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.labForm.controls).forEach(key => {
        this.labForm.get(key)?.markAsTouched();
      });
      alert('Please Fill All Mandatory Fields')
    }
   else {

      const data: any =
      {
        "lab_test": this.labForm.get('lab_test')?.value,
        
      }
      console.log(data)
    
        this._cro.createTestDetails(data).subscribe(
          (data: any) => {
            alert('Test results created successfully');
            this.route.navigate(['/home/cro/labTestGrid'])
            this.labFormval = false
            this.disableAdd = true

          },
          (err: any) => {
            alert('internal server err');
          }
        );
      }
      console.log(this.labForm.value);
    
  }
  pageChange(event: number) {
    this.page = event;
    this.labDetailsData()
  }
}
