import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SponsorService } from 'src/app/sponsor/sponsor.service';
import { CrosService } from '../cros.service';
import { ProtocolService } from '../protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {
  siteDetails: any[]= [];
  uniqueCombinedArray: any[]= [];
  allSiteDetails: any[] = [];
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText= ''
  display: boolean = false;

  constructor(private route: Router, private _cro:CrosService, private protocol: ProtocolService) { }

  ngOnInit(): void {
  this.getSitedetails();
  }

  siteCreate(){
    this.route.navigate(['/home/cro/addSite'])
  }
  edit(id:string, val: string){
    this.route.navigate(['/home/cro/updateSite',id, val])
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



study(id: any) {
  console.log(id);
  
  this.display = true;
  this.protocol.getPreparationBySId(id).subscribe((data: any) => {
    const uniqueScreeningData = this.getUniqueObjects(data.screening_data, 'user_protocol_id');
    const uniqueVisitData = this.getUniqueObjects(data.visit_data, 'user_protocol_id');

    const newScreeningObj: { uniqueScreeningData: any[] } = { uniqueScreeningData: [] };
    const newVisitObj: { uniqueVisitData: any[] } = { uniqueVisitData: [] };

    uniqueScreeningData.forEach((obj: any) => {
      newScreeningObj.uniqueScreeningData.push(obj);
    });

    uniqueVisitData.forEach((obj: any) => {
      newVisitObj.uniqueVisitData.push(obj);
    });
    const combinedArray = newScreeningObj.uniqueScreeningData.concat(newVisitObj.uniqueVisitData);

    this.uniqueCombinedArray = this.getUniqueObjects(combinedArray, 'user_protocol_id');
  });
}

// getUniqueObjects function remains the same as mentioned in the previous response

  getUniqueObjects(arr: any[], uniqueProperty: string): any[] {
    const uniqueObjects: any[] = [];
    const uniqueValues: Set<any> = new Set();
  
    arr.forEach((obj: any) => {
      const value = obj[uniqueProperty];
      if (!uniqueValues.has(value)) {
        uniqueValues.add(value);
        uniqueObjects.push(obj);
      }
    });
  
    return uniqueObjects;
  }
 
  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'auto';
  }
  pageChange(event: number) {
    this.page = event;
    this.getSitedetails()
  }
}
