import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SponsorService } from 'src/app/sponsor/sponsor.service';
import { CrosService } from '../cros.service';

@Component({
  selector: 'app-sponsor-grid',
  templateUrl: './sponsor-grid.component.html',
  styleUrls: ['./sponsor-grid.component.css']
})
export class SponsorGridComponent implements OnInit {
  sponsorDetails: any[]= [];

  constructor(private route:Router, 
    private _cro:CrosService) { }

  ngOnInit(): void {
    this.getSponsorDetails()
  }
  sponsorCreate(){
    this.route.navigate(['/home/cro/csponsor'])
  }
  edit(id:string){
    this.route.navigate(['/home/cro/csponsorUpdate',id])
  }
  getSponsorDetails(){
    this._cro.getsponsors().subscribe(
      (data:any)=>{
      this.sponsorDetails = data
       console.log(data)
      },
      (err:any)=>{
        alert("err")
      }
    )
  }
}
