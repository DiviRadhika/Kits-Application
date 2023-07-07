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
  userDetails: any[] = [];
  searchText = ''
  allUserData: any;
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  constructor(private admin: AdminService, private route: Router) {
    this.getUser()

  }

  ngOnInit(): void {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.userDetails = this.allUserData;
    }
    else {
      this.userDetails = this.allUserData.filter(
        (user: any) =>
          (user.first_name && user.first_name.toLowerCase().includes(filterValue)) ||
          (user.last_name && user.last_name.toLowerCase().includes(filterValue)) ||
          (user.email && user.role.toLowerCase().includes(filterValue))
      );
    }

  }
  pageChange(event: number) {
   this.page = event;
    this.getUser()
  }
  addUser() {
    this.route.navigate(['/home/admin/userCreate'])
  }
  edit(id: string, val: string) {
    this.route.navigate(['/home/admin/userUpdate', id, val])
  }
  getUser() {
    this.getUserData = this.admin.getUser().subscribe((data: any) => {
      this.userDetails = data
      this.allUserData = data
      this.totalCount = this.userDetails.length
    })

  }

}
