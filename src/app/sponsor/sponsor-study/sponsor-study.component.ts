import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-sponsor-study',
  templateUrl: './sponsor-study.component.html',
  styleUrls: ['./sponsor-study.component.css']
})
export class SponsorStudyComponent implements OnInit {
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
   this.study()
 
    }

  siteCreate(){
      this.route.navigate(['/home/cro/protocol'])
    }
  view(id: string, sponsor: string){
      this.route.navigate(['/home/cro/protocolView', id, sponsor])
    }
  edit(id: string){
    console.log(id);
    
      this.route.navigate(['/home/site/sampleCollection', id])
    }


    study() {
      console.log(this.ID);
      
  
      this.protocol.getPreparationBySponsor(sessionStorage.getItem('sponsorId')).subscribe((data: any) => {
        console.log(data);
        
        this.uniqueCombinedArray =data
      });
   
      
    }
    
    // getUniqueObjects function remains the same as mentioned in the previous response
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
    // this.getProtocolDetails()
  }
}
