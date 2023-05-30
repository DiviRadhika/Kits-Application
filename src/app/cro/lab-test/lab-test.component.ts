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
    })

  }
}
