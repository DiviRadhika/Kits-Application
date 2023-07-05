import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-view-sites',
  templateUrl: './view-sites.component.html',
  styleUrls: ['./view-sites.component.css']
})
export class ViewSitesComponent implements OnInit {
  protocolDetails: any[] = [];
  allprotocolDetails: any[] = [];
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText = ''
  email: string | null;
  ID: any;
  uniqueCombinedArray: any[] = [];

  constructor(private route: Router, private protocol: ProtocolService, private croService: CrosService) { 
    this.email =sessionStorage.getItem('email')
  }

  ngOnInit(): void {
   
    // this.getProtocolDetails();
    this.croService.getSites().subscribe((data:any)=>{
      //  console.log(data)
      //  this.siteDetails = data
      //  this.allSiteDetails = data


       data.forEach((sponser: any) => {


        // this.sponsers.push(sponser);
        data.forEach((res: any) => {
          if(data.email == this.email){
     
          this.ID = sponser.site_data_code
          alert(this.ID)
          this.study()
          }
        });
      });
     
     })
 
    }

  siteCreate(){
      this.route.navigate(['/home/cro/protocol'])
    }
  view(id: string){


      this.route.navigate(['/home/cro/protocolView', id])
    }
  edit(id: string){
      this.route.navigate(['/home/cro/protocolUpdate', id])
    }
  pCreate(){
      this.route.navigate(['/home/cro/protocolRegistration'])
    }
  getProtocolDetails(){
      this.protocol.getProtocol().subscribe((data: any) => {
        console.log(data)
        this.protocolDetails = data
        this.allprotocolDetails = data
      })

    }
    study() {
      console.log(this.ID);
      
  
      this.protocol.getPreparationBySId(this.ID).subscribe((data: any) => {
        console.log(data);
        
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
      console.log( this.uniqueCombinedArray);
      
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
  applyFilter(filterValue: string) {
      filterValue = filterValue.trim(); // Remove whitespace
      filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
      if(filterValue === '') {
      this.protocolDetails = this.allprotocolDetails;
    }
    else {
      this.protocolDetails = this.allprotocolDetails.filter(
        (siteData: any) =>
          (siteData.protocol_id && siteData.protocol_id.toLowerCase().includes(filterValue)) ||
          (siteData.protocol_name && siteData.protocol_name.toLowerCase().includes(filterValue)) ||
          (siteData.email && siteData.email.toLowerCase().includes(filterValue))
      );
    }
  }
  pageChange(event: number) {
    this.page = event;
    this.getProtocolDetails()
  }
}
