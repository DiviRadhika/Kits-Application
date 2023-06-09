import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
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
  userForm: FormGroup = new FormGroup({
    first_name: new FormControl("", [Validators.required]),
    last_name: new FormControl(),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        "^(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$"
      )
  
    ]),
    
    role: new FormControl("", [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.emailDomainValidator.bind(this)
    ]),
    status: new FormControl("", [Validators.required]),
  });

  options: string[] = ['Sponsor', 'CRO', 'Central Lab'];
  id: any;
  getUserData: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router
  ) { }

  ngOnInit(): void {
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

  emailDomainValidator(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (!['gmail.com'].includes(domain)) {
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