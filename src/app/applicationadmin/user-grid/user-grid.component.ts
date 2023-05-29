import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.css']
})
export class UserGridComponent implements OnInit {
 public getUserData: any;
  userDetails:any[]= [];

  constructor(private admin:AdminService, private route: Router) { 
    this.getUser()
    
  }

  ngOnInit(): void {
  }
  addUser(){
    this.route.navigate(['/home/admin/userCreate'])
  }
  edit(id:string){
    this.route.navigate(['/home/admin/userUpdate',id])
  }
  getUser(){
    this.getUserData =  this.admin.getUser().subscribe((data:any)=>{
      console.log(data)
      this.userDetails = data
    })

  }

}