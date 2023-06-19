import { Component, OnInit } from '@angular/core';
import { CrosService } from '../cros.service';
import { FormBuilder, FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/applicationadmin/admin.service';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent  {

  public isEdit: boolean = false;
  public id: any = '';
  getData: any;
  myData: { text: any; value: any; }[]= [];
  constructor(private _cro: CrosService,
    private _activatedRoute: ActivatedRoute, private admin:AdminService,
    private fb: FormBuilder, private router:Router
   ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {    
        this.isEdit = true;
        this.id = data.id;
        _cro.getSiteById(data.id).subscribe((data: any) => {
          this.siteForm.patchValue(data);
          this.getData = data  
          this.siteForm.controls['site_data_code'].disable();
          this.siteForm.controls['site_data_name'].disable();
          this.siteForm.controls['legal_site_data_name'].disable();
          this.siteForm.controls['email'].disable();
        }); 
      }
    });
    this.admin.country().subscribe((resp: any) => {
      console.log(resp)
      const countries = [];
      for (let i = 0; i < resp.length; ++i) {
          const country = resp[i];
          countries.push({ text: country.text, value: country.value });
      }
      this.myData = countries;
      console.log(countries)
  }); 
  }
 
  public siteForm: FormGroup = new FormGroup({
    site_data_code: new FormControl("", [Validators.required]),
    site_data_name: new FormControl("", [Validators.required]),
    legal_site_data_name: new FormControl("", [Validators.required]),
    address_1: new FormControl("", [Validators.required]),
    address_2: new FormControl(""),
    address_3: new FormControl("", ),
    address_4: new FormControl(""),
    city: new FormControl("", [Validators.required]),
    district: new FormControl("", [Validators.required]),
    region: new FormControl("", [Validators.required]),
    zip_code: new FormControl("", [Validators.required, Validators.min(100000), Validators.max(999999)]),
    country: new FormControl("", [Validators.required]),
    office_telephone: new FormControl(""),
    extension: new FormControl(""),
    email: new FormControl(''),
    website:new FormControl(''),
    mobile_telephone:new FormControl(''),
    first_name:new FormControl("", [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!@#$%^&*()]).{8,}$/)
    ]),


    uemail: new FormControl("",[Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),

 
  });

  emailDomainValidator(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (!['.com'].includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null; // Return null for valid email format
  }
  shouldShowRequired(controlName: string): boolean {
    const control = this.siteForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  shouldShowLengthError(controlName: any): boolean {
    const control = this.siteForm.get(controlName);
    return control?.invalid && (control?.errors?.['minlength'] || control?.errors?.['maxlength']) && (control?.dirty || control?.touched) || false;
  }
  shouldShowPatternError(controlName: string): boolean {
    const control = this.siteForm.get(controlName);
    return control?.touched && control?.errors?.['pattern'];
  }
  shouldShowUrlError(controlName: string): boolean {
    const control = this.siteForm.get(controlName);
    return !!control?.hasError('pattern') && !!control?.value && (control?.dirty || control?.touched);
  }

  submit(){
  console.log(this.siteForm.controls['country'].value);
  
      if (this.siteForm.invalid) {
        // Mark all form controls as touched to trigger validation
        Object.keys(this.siteForm.controls).forEach(key => {
          this.siteForm.get(key)?.markAsTouched();
        });
        alert('Please Fill All Mandatory Fields')
      }
   
   else {
    const obj:any ={
      "site_data_code": this.siteForm.controls['site_data_code'].value,
      "site_data_name": this.siteForm.controls['site_data_name'].value,
      "legal_site_data_name": this.siteForm.controls['legal_site_data_name'].value,
      "address_1": this.siteForm.controls['address_1'].value,
      "address_2": this.siteForm.controls['address_2'].value,
      "address_3": this.siteForm.controls['address_3'].value,
      "address_4": this.siteForm.controls['address_4'].value,
      "city": this.siteForm.controls['city'].value,
      "district": this.siteForm.controls['district'].value,
      "region": this.siteForm.controls['region'].value,
      "zip_code": this.siteForm.controls['zip_code'].value,
      "country": this.siteForm.controls['country'].value,
      "office_telephone": this.siteForm.controls['office_telephone'].value,
      "mobile_telephone": this.siteForm.controls['mobile_telephone'].value,
      "extension": this.siteForm.controls['extension'].value,
      "email": this.siteForm.controls['email'].value,
      "website": this.siteForm.controls['website'].value,
      "status": true
    }
    if(this.isEdit){
      obj.site_id = this.id
      this._cro.updateSiteDetails(obj).subscribe(
        (data:any)=>{
          alert('Site Deatails updated successfully');
          this.router.navigate(['/home/cro/siteGrid'])
        },
        (err:any)=>{
          alert("server errorr")
        }
      );
    }
    else{
      this._cro.CreateSiteDetails(obj).subscribe(
        (data:any)=>{
          alert("Site Deatails Created Successfully");
          this.router.navigate(['/home/cro/siteGrid'])
        },
        (err:any)=>{
          alert("err")
        }
      )
    }
  
}
  }
}

