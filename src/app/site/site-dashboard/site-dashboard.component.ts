import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';

@Component({
  selector: 'app-site-dashboard',
  templateUrl: './site-dashboard.component.html',
  styleUrls: ['./site-dashboard.component.css']
})
export class SiteDashboardComponent implements OnInit {
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
    this.getCRoDetails();
    // this.getsite()
  }
  applyFilter(e:any){

  }
  getsite(){
    this.admin.getsite().subscribe(
      (data: any) => {
        // this.croDetails = data
        // this.allcroDetails = data
        console.log(data)
        this.totalCount = this.croDetails.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
  
  }
  getCRoDetails() {
    this.admin.getsite().subscribe(
      (data: any) => {
        this.croDetails = data
        this.allcroDetails = data
        console.log(data)
        this.totalCount = this.croDetails.length
      },
      (err: any) => {
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )
  }
}
