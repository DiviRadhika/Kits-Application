import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-newkits',
  templateUrl: './newkits.component.html',
  styleUrls: ['./newkits.component.css']
})
export class NewkitsComponent implements OnInit {
  totalCountR =  0;
  reports: boolean = false;
  subject: boolean = false;
  inventory: boolean= false;
  inventoryData: any;
  totalCountI: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  classifications = ['Select CRA','Eliot', 'Ruffel'];
  Age = [10,20, 30, 40, 50, 60,70];
  Age1 = [10,20, 30, 40, 50, 60,70];
  Gender =  ['Male','Female']
  site= ['S001', 'S0002', 'S0003', 'S0004']
  Study = ['20001-002', '20001-001', '20001-007']
  visit = ['Visit1', 'Visit2', 'Visit3', 'Visit4','Visit5', 'Visit6']
  access = ['314321346', '254321346', '654321346','554321346']
  croDetails: any[] = []
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText: any
  isMenuOpen: boolean = false;
  allcroDetails: any;
 // 1 for ascending, -1 for descending
 
  constructor(private route: Router,
    private admin: AdminService,
    private messageService: MessageService) { }

  
  pageChange(event: number) {
    this.page = event;
    this.getCRoDetails()
  }


  ngOnInit(): void {
    if (this.route.url === '/home/site/labReports') {
      this.getReports()
      this.reports = true
      this.subject = false
      this.inventory = false
      this.classifications = ['Select Type','Lab Result', 'Cancellation'];
    } 
    else if (this.route.url === '/home/site/newkits') {
      
      this.getCRoDetails();
      this.subject = true
      this.reports = false
      this.inventory = false
      this.classifications = ['Select CRA','Eliot', 'Ruffel'];
   }
   else if (this.route.url === '/home/site/inventory') {
      
    this.getInventory();
    this.subject = false
    this.reports = false
    this.inventory = true
    this.classifications = ['Select Type','Screening ', 'Visit'];
    
 }

  }
 
  getReports(){
    this.admin.getReports().subscribe(
      (data: any) => {
    
        this.allcroDetails = data
        console.log(data)
        this.totalCountR = this.allcroDetails.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    ) 
  }
  getInventory(){
    this.admin.getInventory().subscribe(
      (data: any) => {
    
        this.inventoryData = data
        console.log(data)
        this.totalCountI = this.inventoryData.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )  
  }
  base64String: any;
  Download(id: any) {
    console.log(id)

    this.base64String = id
    if(this.base64String == ''){
      this.base64String  = 'NOt Uploaded Any PDF'
    }

    // Convert the base64 string to a Uint8Array
    const binaryArray = Uint8Array.from(atob(this.base64String), c => c.charCodeAt(0));

    // Create a Blob from the binary data
    const blob = new Blob([binaryArray], { type: 'application/pdf' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a link element and set its attributes
    const link = document.createElement('a');
    link.href = url;
    link.download = 'file.pdf';

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);

  }
  pdfContent: string = 'data:application/pdf;base64,...';
  viewPdf(file: any) {
   
    console.log(file)
    const url = URL.createObjectURL(file);

    // Open the PDF in a new window
    window.open(url, '_blank');
  }

  getCRoDetails() {
    this.admin.getsite().subscribe(
      (data: any) => {
        this.croDetails = data
        console.log(data)
       
        this.totalCount = this.croDetails.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
  }
}






  




