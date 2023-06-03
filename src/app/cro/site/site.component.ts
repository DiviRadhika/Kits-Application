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
  allSiteDetails: any[] = [];
  page = 1;
  totalCount = 0
  pageSize = 2;
  p = 1;
  searchText= ''

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
      this.allSiteDetails = data
    })

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.siteDetails = this.allSiteDetails;
    }
    else {
      this.siteDetails = this.allSiteDetails.filter(
        (siteData: any) =>
          (siteData.site_data_code && siteData.site_data_code.toLowerCase().includes(filterValue)) ||
          (siteData.site_data_name && siteData.site_data_name.toLowerCase().includes(filterValue)) ||
          (siteData.email && siteData.email.toLowerCase().includes(filterValue))
      );
    }
  }
  pageChange(event: number) {
    this.page = event;
    this.getSitedetails()
  }
}
