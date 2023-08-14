import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-prepration-grid',
  templateUrl: './prepration-grid.component.html',
  styleUrls: ['./prepration-grid.component.css']
})
export class PreprationGridComponent implements OnInit {
  protocolDetails: any[]= [];
  allprotocolDetails: any[] = [];
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText= ''

  constructor(private route: Router, private protocol: ProtocolService, private messageService: MessageService ) { }

  ngOnInit(): void {
  this.getProtocolDetails();
  }

  siteCreate(){
    this.route.navigate(['/home/cro/protocol'])
  }
  // view(id:string){

    
  //   this.route.navigate(['/home/cro/kitPrepration',id, 'protocol'])
  // }
  edit(id:string){
  
    this.protocol.getPreparationById(id).subscribe((protocolsData) => {
  }),
  this.protocol.getPreparationById(id).subscribe(
    (data: any) => {
      this.route.navigate(['/home/centralLab/kitPrepration',id, 'edit'])
    },
    (err: any) => {
      console.log(err); 
      this.route.navigate(['/home/centralLab/kitPrepration',id,'add'])
     
    }
  );
  
 
  }
  // pCreate(){
  //   this.route.navigate(['/home/centralLab/kitPrepration', id])
  // }
  getProtocolDetails(){
   this.protocol.getProtocol().subscribe((data:any)=>{
      console.log(data)
      this.protocolDetails = data
      this.allprotocolDetails = data
    })

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
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
