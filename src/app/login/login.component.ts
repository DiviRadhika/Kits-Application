import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../applicationadmin/admin.service';
import { Router } from '@angular/router';
import {  password1 } from 'src/password';
import { ThisReceiver } from '@angular/compiler';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enableFields: boolean = false;
  @ViewChild('myModal') myModal: any;
  disableFields: boolean =false;
  constructor(private admin: AdminService, private route: Router, private formBuilder: FormBuilder) { }

loginForm!: FormGroup;
forgetForm!:FormGroup;
submitted = false;





ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],

        password: ['', Validators.required],
        otp: [''],
        
    }, 
   );
this.forgetForm =this.formBuilder.group({
  email1: ['', [Validators.required, Validators.email]],
  otp: [''],
  npassword: ['', [Validators.required, Validators.minLength(8)]],
  // npassword: ['', [Validators.required, Validators.minLength(6)]],
  confirmPassword: ['', Validators.required],
},
{
  validators: password1('npassword', 'confirmPassword')
})

}
reset(){
  this.disableFields = true
  const obj = {
    email: this.forgetForm.controls['email1'].value,
    password: this.forgetForm.controls['confirmPassword'].value,
    otp: 123456
  }
 
 
  if(this.forgetForm.controls['npassword'].value === '' || this.forgetForm.controls['npassword'].value ===undefined ){
    alert('Please Enter Password')
  }
  else if(this.forgetForm.controls['confirmPassword'].value=== undefined || this.forgetForm.controls['confirmPassword'].value === ''){
    alert('Please Enter Confirm Password')
  }
  else{
  
    this.admin.reset(obj).subscribe(
      (data: any) => {
        alert('Password Reset Successfully')
        this.route.navigate(['/login']);
        console.log(data);
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('access_token', data.access_token);
        this.myModal.hide();
      },
      (err: any) => {
        console.log(err); // Log the specific error message to the console
        alert('Error occurred while resetting password');
      }
    );
  ;

}


}
  login() {
    const obj = {
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value,
      clear_session: true,
      otp: this.loginForm.controls['otp'].value
    }
    this.admin.login(obj).subscribe(
      (data: any) => {
        console.log(data)
        this.route.navigate(['/home'])
        console.log(data)
        sessionStorage.setItem('role', data.role)
        sessionStorage.setItem('access_token', data.access_token)
      },
      (err: any) => {
        alert(err.error.message)
      }
    )
  }
  set(){
    this.disableFields = true
    const obj ={
      username: this.forgetForm.controls['email1'].value,
      clear_session: 'false',
      password:'',
      otp:''

    }
    this.admin.otp(obj).subscribe(
      (data: any) => {
        alert('OTP sent to your Email')
        this.disableFields = true
        // this.route.navigate(['/home'])
      },
      (err: any) => {
        
        this.disableFields = false
      
        alert(err.error.message)
      }
    ),
    this.admin['set'](obj).subscribe(
      (data: any) => {
        this.disableFields = true
        // this.route.navigate(['/home'])
      },
      (err: any) => {
        
        this.disableFields = false
      
        alert(err.error.message)
      }
    )

  }
  
  otp() {
    this.enableFields = true
    const obj = {
      username: this.loginForm.controls['username'].value,
      password: '',
      clear_session: '',
      otp: ''
    }
    this.admin.otp(obj).subscribe(
      (data: any) => {
        
        this.enableFields = true

        // this.route.navigate(['/home'])
      },
      (err: any) => {
        
        this.enableFields = false
      
        alert(err.error.message)
      }
    )
  }

}