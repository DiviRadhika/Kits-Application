import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-cro-grid',
  templateUrl: './cro-grid.component.html',
  styleUrls: ['./cro-grid.component.css']
})
export class CroGridComponent implements OnInit {
  croDetails: any[] = []
  searchText :any 
  constructor(private route:Router,
    private admin:AdminService) { }

  //   applyFilter() {
  //     this.searchText = this.searchText.trim(); // Remove whitespace
  //     this.searchText.filter((data:any)=>
  //     JSON.stringify(data).toLowerCase().indexOf(this.searchText.toLowerCase))!=-1))''

  //     // })) // Datasource defaults to lowercase matches
  //     // this.croDetails.filter = filterValue;
  // }
  ngOnInit(): void {
    this.getCRoDetails();
  }
  croCreate(){
    this.route.navigate(['/home/admin/croCreate'])
  }
  edit(id:string){
    this.route.navigate(['/home/admin/croUpdate',id])
  }
  getCRoDetails(){
    this.admin.getCro().subscribe(
      (data:any)=>{
      this.croDetails = data
       console.log(data)
      },
      (err:any)=>{
        alert("err")
      }
    )
  }
}
