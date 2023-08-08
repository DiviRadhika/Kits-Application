import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../applicationadmin/admin.service';
import { Router } from '@angular/router';
import { password1 } from 'src/password';
import { ThisReceiver } from '@angular/compiler';
import { MessageService } from 'primeng/api'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  enableFields: boolean = false;
  @ViewChild('myModal') myModal: any;
  disableFields: boolean = false;
  emailvalue: any;
  emailvaluef: any;
  constructor(private admin: AdminService, private route: Router, private formBuilder: FormBuilder,
    private messageService: MessageService) { }

  loginForm!: FormGroup;
  forgetForm!: FormGroup;
  submitted = false;


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      otp: [''],

    },
    );
    this.forgetForm = this.formBuilder.group({
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
  reset() {
    this.disableFields = true
    const obj = {
      email: this.emailvaluef,
      password: this.forgetForm.controls['confirmPassword'].value,
      otp: 123456
    }


    if (this.forgetForm.controls['npassword'].value === '' || this.forgetForm.controls['npassword'].value === undefined) {
      // alert('Please Enter Password')
      this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Please Enter Password' });
    }
    else if (this.forgetForm.controls['confirmPassword'].value === undefined || this.forgetForm.controls['confirmPassword'].value === '') {
      // alert('Please Enter Confirm Password')
      this.messageService.add({ severity: 'warn', summary: 'Warning Message', detail: 'Error occurred while resetting password' });
    }
    else {

      this.admin.reset(obj).subscribe(
        (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Password Reset Successfully' });

          this.route.navigate(['/login']);
          console.log(data);
          sessionStorage.setItem('role', data.role);
          sessionStorage.setItem('access_token', data.access_token);
          this.myModal.hide();
        },
        (err: any) => {
          console.log(err); // Log the specific error message to the console

          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Error occurred while resetting password' });
        }
      );
      ;

    }

  }
  login() {
    const obj = {
      username: this.emailvalue,
      password: this.loginForm.controls['password'].value,
      clear_session: true,
      otp: this.loginForm.controls['otp'].value
    }
    this.admin.login(obj).subscribe(
      (data: any) => {
        console.log(data)
        // this.route.navigate(['/home'])
        this.route.navigate(['/home/cro/dashboards'])
        console.log(data.role)
        sessionStorage.setItem('role', data.role)
        sessionStorage.setItem('userid', data.user_id)
        sessionStorage.setItem('access_token', data.access_token)
      

        this.admin.getUserbyId(data.user_id).subscribe((data: any) => {
          console.log(data);
          sessionStorage.setItem('firstName', data.first_name)
          sessionStorage.setItem('lastName', data.last_name)
          sessionStorage.setItem('email', data.email)
          sessionStorage.setItem('siteId', data.site_id)
          sessionStorage.setItem('sponsorId', data.sponsor_id)
          sessionStorage.setItem('fullName', data.first_name + ' '+ data.last_name)
        });

      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    )
  }
  set() {
    this.disableFields = true
    this.emailvaluef = this.forgetForm.controls['email1'].value.toLowerCase();
    const obj = {
      username: this.emailvaluef,
      clear_session: 'false',
      password: '',
      otp: ''

    }
    this.admin.otp(obj).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'OTP sent to your Email' });

        this.disableFields = true
        // this.route.navigate(['/home'])
      },
      (err: any) => {

        this.disableFields = false

        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    ),
      this.admin['set'](obj).subscribe(
        (data: any) => {
          this.disableFields = true
          // this.route.navigate(['/home'])
        },
        (err: any) => {

          this.disableFields = false

          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
        }
      )

  }

  otp() {
    this.emailvalue = this.loginForm.controls['username'].value.toLowerCase();
    this.enableFields = true
    const obj = {
      username: this.emailvalue,
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
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });

      }
    )
  }

}