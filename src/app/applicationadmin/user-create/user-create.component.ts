import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
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
    first_name: new FormControl("", [Validators.required]),
    last_name: new FormControl(),
    password:new FormControl(''),
    role: new FormControl("", [Validators.required]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.emailDomainValidator.bind(this)
    ]),
  
  });
  
  options: string[] = ['Sponsor', 'CRO', 'Central Lab', 'Site'];
  id: any;
  getUserData: any;
  constructor(private _activatedRoute: ActivatedRoute, private admin:AdminService, private route:Router) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {    
        this.isEdit = true;
        this.id = data.id;
        admin.getUserbyId(data.id).subscribe((data: any) => {
          // this.userForm.patchValue(data);
          this.getUserData = data 
          this.userForm.patchValue(this.getUserData)
        
          this.userForm.controls['email'].disable()

       
        });  

      }
      else{
        this.isEdit = false;
      }
    });
   }

  ngOnInit(): void {
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
    return null; // Return null for valid email format
  }
  submit(){
    if (this.userForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.userForm.controls).forEach(key => {
        this.userForm.get(key)?.markAsTouched();
      });
    }
  else {
    const obj:any ={
       
      "first_name": this.userForm.controls['first_name'].value,
      "last_name": this.userForm.controls['last_name'].value,
      "email": this.userForm.controls['email'].value,
      "password": this.userForm.controls['password'].value,
      "role": this.userForm.controls['role'].value,
    }
    if(this.isEdit){
      this.admin.updateUser(obj).subscribe(
        (data:any)=>{
          alert('User updated successfully');
          this.route.navigate(['/home/admin/userGrid'])
        },
        (err:any)=>{
          alert("server errorr")
        }
      );
    }
    else{
     
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
}
