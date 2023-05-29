import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  public isEdit: boolean = false;
  public userForm: FormGroup = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    password: new FormControl(),
    email: new FormControl(),
    role: new FormControl(),

  });
  options: string[] = ['Sponsor', 'CRO', 'Central Lab', 'Site'];
  id: any;
  getUserData: any;
  constructor(private _activatedRoute: ActivatedRoute, private admin:AdminService, private route:Router) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {    
        this.isEdit = true;
        this.id = data.id;
        admin.getCroDeatils(data.id).subscribe((data: any) => {
          // this.userForm.patchValue(data);
          this.getUserData = data  
        });    
      }
    });
   }

  ngOnInit(): void {
  }
  submit(){
    if(this.isEdit){
      this.admin.updateCroDetaild(this.userForm.value,this.id).subscribe(
        (data:any)=>{
          alert('updated successfully');
        },
        (err:any)=>{
          alert("server errorr")
        }
      );
    }
    else{
      const obj:any ={
        "first_name": this.userForm.controls['first_name'].value,
        "last_name": this.userForm.controls['last_name'].value,
        "email": this.userForm.controls['email'].value,
        "password": this.userForm.controls['password'].value,
        "role": this.userForm.controls['role'].value,
      }
      console.log(obj)
      this.admin.createUser(obj).subscribe(
        (data:any)=>{
          alert("User Deatails Created Successfully");
          this.route.navigate(['/home/admin/userGrid'])
        },
        (err:any)=>{
          alert("err")
        }
      )
    }
  }
}
