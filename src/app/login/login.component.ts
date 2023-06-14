import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../applicationadmin/admin.service';
import { Router } from '@angular/router';
import {  password1 } from 'src/password';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enableFields: boolean = false;
  @ViewChild('myModal') myModal: any;
  constructor(private admin: AdminService, private route: Router, private formBuilder: FormBuilder) { }

loginForm!: FormGroup;
submitted = false;



ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
        password: ['', Validators.required],
        otp: [''],
        npassword: ['', [Validators.required, Validators.minLength(8)]],
      
        // npassword: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
    }, {
        validators: password1('npassword', 'confirmPassword')
    });
}
reset(){
  const obj = {
    email: this.loginForm.controls['username'].value,
    password: this.loginForm.controls['confirmPassword'].value,
    otp: 123456
  }
 
 
  if(this.loginForm.controls['npassword'].value === '' || this.loginForm.controls['npassword'].value ===undefined ){
    alert('Please Enter Password')
  }
  else if(this.loginForm.controls['confirmPassword'].value=== undefined || this.loginForm.controls['confirmPassword'].value === ''){
    alert('Please Enter Confirm Password')
  }
  else{

  this.admin.reset(obj).subscribe(
    (data: any) => {
      this.route.navigate(['/home'])
      console.log(data)
      sessionStorage.setItem('role', data.role)
      sessionStorage.setItem('access_token', data.access_token)
      this.myModal.hide();
    },
    (err: any) => {
      alert("err")
    }
  )
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





