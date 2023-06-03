import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosService } from '../cros.service';

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
  pageSize = 2;
  p = 1;
  searchText = '';
  constructor(private route: Router, private _cro:CrosService) { }

  ngOnInit(): void {
  this.labDetailsData();
  }

  edit(id:any){
    this.route.navigate(['/home/cro/updateLabTest',id])
  }
  labCreate(){
    this.route.navigate(['/home/cro/createLabTest'])

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
  pageChange(event: number) {
    this.page = event;
    this.labDetailsData()
  }
}
