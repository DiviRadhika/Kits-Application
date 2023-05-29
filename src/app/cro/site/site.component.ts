import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorService } from 'src/app/sponsor/sponsor.service';
import { CrosService } from '../cros.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  siteDetails: any[]= [];

  constructor(private route: Router, private _cro:CrosService) { }

  ngOnInit(): void {
  this.getSitedetails();
  }

  siteCreate(){
    this.route.navigate(['/home/cro/addSite'])
  }
  edit(id:string){
    this.route.navigate(['/home/cro/updateSite',id])
  }
  getSitedetails(){
   this._cro.getSites().subscribe((data:any)=>{
      console.log(data)
      this.siteDetails = data
    })

  }
}
