import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-cro-grid',
  templateUrl: './cro-grid.component.html',
  styleUrls: ['./cro-grid.component.css']
})
export class CroGridComponent implements OnInit {
  croDetails: any[] = []
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText: any
  allcroDetails: any;
  constructor(private route: Router,
    private admin: AdminService,
    private messageService: MessageService) { }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.croDetails = this.allcroDetails;
    }
    else {
      this.croDetails = this.allcroDetails.filter(
        (cro: any) =>
          (cro.cro_code && cro.cro_code.toLowerCase().includes(filterValue)) ||
          (cro.cro_name && cro.cro_name.toLowerCase().includes(filterValue)) ||
          (cro.legal_cro_name && cro.legal_cro_name.toLowerCase().includes(filterValue))
      );
    }

  }
  pageChange(event: number) {
    this.page = event;
    this.getCRoDetails()
  }


  ngOnInit(): void {
    this.getCRoDetails();
  }
  croCreate() {
    this.route.navigate(['/home/admin/croCreate'])
  }
  edit(id: string, val: string) {
    this.route.navigate(['/home/admin/croUpdate', id, val])
  }
  getCRoDetails() {
    this.admin.getCro().subscribe(
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
