import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-Prepration-grid',
  templateUrl: './Prepration-grid.component.html',
  styleUrls: ['./Prepration-grid.component.css']
})
export class PreprationGridComponent implements OnInit {
  protocolDetails: any[]= [];
  allprotocolDetails: any[] = [];
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText= ''
  sortDirection: number = 1; // 1 for ascending, -1 for descending
  sortedColumn: string = '';
  sort(Column: string) {
    if (this.sortedColumn === Column)
    {
      this.sortDirection *= -1;
    }
    else(this.sortedColumn = Column)
    {
      this.sortDirection *= 1;
    }   
  } 
  compareValues(a: any, b: any) {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    } else {
      return 0;
    }
  }

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
  
    this.protocol.getPreprationById(id).subscribe((protocolsData) => {
  }),
  this.protocol.getPreprationById(id).subscribe(
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
