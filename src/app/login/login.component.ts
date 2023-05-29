import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AdminService } from '../applicationadmin/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private admin:AdminService, private route: Router) { }
public loginForm : FormGroup = new FormGroup({
  username: new FormControl(),
  password: new FormControl()
})

ngOnInit(): void {
  
}
login(){
  const obj = {
    username: this.loginForm.controls['username'].value,
    password: this.loginForm.controls['password'].value,
    clear_session: true,
    otp: "123456"
  }
  this.admin.login(obj).subscribe(
    (data:any)=>{
      this.route.navigate(['/home'])
      console.log(data)
      sessionStorage.setItem('role', data.role)
      sessionStorage.setItem('access_token', data.access_token)
    },
    (err:any)=>{
      alert("err")
    }
  )
}
otp(){
  const obj = {
    username: this.loginForm.controls['username'].value,
    password: '',
    clear_session: '',
    otp: ''
  }
  this.admin.otp(obj).subscribe(
    (data:any)=>{
      // this.route.navigate(['/home'])
    },
    (err:any)=>{
      alert("err")
    }
  )
}
  
}


  
 

