import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
// import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  

  isEdit: boolean = false;
  status:  string[] = ['Active', 'In Active'];
  // readonly passwordPattern: RegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/;
  userForm: FormGroup = new FormGroup({
    first_name: new FormControl("", [Validators.required]),
    last_name: new FormControl(),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/)
    ]),
    role: new FormControl("", [Validators.required]),

    email: new FormControl("",[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),
 
    status: new FormControl(),
  });

  options: string[] = ['Sponsor', 'CRO', 'Central Lab'];
  id: any;
  getUserData: any;
  // passwordControl!: FormControl<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private fb:FormBuilder
  ) {
  
   }

  ngOnInit(): void {
    // this.passwordControl = this.userForm.get('password') as FormControl;
    this.activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        (data.id).subscribe((data: any) => {
          this.getUserData = data;
          this.userForm.patchValue(this.getUserData);
          this.userForm.controls['email'].disable();
          this.userForm.controls['role'].disable();
        });
      } else {
        this.isEdit = false;
      }
    });
  }

  shouldShowRequired(controlName: string): boolean {
    const control = this.userForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }
  get passwordControl(): FormControl {
    return this.userForm.get('password') as FormControl;
  }
  emailDomainValidator(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (!['.com'].includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null;
  }

  submit(): void {
    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key)?.markAsTouched();

      });
      alert('Please Fill all Mandatory Fields')
    } else {
      const userObj: any = {
        first_name: this.userForm.controls['first_name'].value,
        last_name: this.userForm.controls['last_name'].value,
        email: this.userForm.controls['email'].value,
        password: this.userForm.controls['password'].value,
        role: this.userForm.controls['role'].value
      };
      if (this.isEdit) {
      userObj.status = this.userForm.controls['status'].value
        this.adminService.updateUser(userObj).subscribe(
          (data: any) => {
            alert('User updated successfully');
            this.router.navigate(['/home/admin/userGrid']);
          },
          (err: any) => {
            alert('Server error');
          }
        );
      } else {
        userObj.status = 'Active'
        this.adminService.createUser(userObj).subscribe(
          (data: any) => {
            alert('User details created successfully');
            this.router.navigate(['/home/admin/userGrid']);
          },
          (err: any) => {
            alert('Error');
          }
        );
      }
    }
  }

}


