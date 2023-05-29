import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { SponsorService } from 'src/app/sponsor/sponsor.service';
import { CrosService } from '../cros.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  public isEdit: boolean = false;
  public id: any = '';


  
 
  constructor(
    private route: Router,
    private _cro:CrosService,
    private _activatedRoute: ActivatedRoute,
   ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        _cro.getSponsorDetails(data.id).subscribe((data: any) => {
          this.sponsorForm.patchValue(data);
        });
      }
    });
  }
ngOnInit(): void {
  
}
  shouldShowRequired(controlName: string): boolean {
    const control = this.sponsorForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  shouldShowLengthError(controlName: any): boolean {
    const control = this.sponsorForm.get(controlName);
    return control?.invalid && (control?.errors?.['minlength'] || control?.errors?.['maxlength']) && (control?.dirty || control?.touched) || false;
  }
  shouldShowPatternError(controlName: string): boolean {
    const control = this.sponsorForm.get(controlName);
    return control?.touched && control?.errors?.['pattern'];
  }
  shouldShowUrlError(controlName: string): boolean {
    const control = this.sponsorForm.get(controlName);
    return !!control?.hasError('pattern') && !!control?.value && (control?.dirty || control?.touched);
  }

  public sponsorForm: FormGroup = new FormGroup({
    sponsor_code: new FormControl("", [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
    sponsor_name: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    legal_sponsor_name: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    address_1: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    address_2: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    address_3: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    address_4: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    city: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    district: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    region: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    zip_code: new FormControl("", [Validators.required, Validators.min(100000), Validators.max(999999)]),
    country: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    office_telephone: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    extension: new FormControl("", [Validators.required, Validators.maxLength(14), Validators.minLength(6)]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      this.emailDomainValidator.bind(this)
    ]),


    website: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern(
        /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i
      ) // Regular expression pattern for URL validation
    ]),

    mobile_no: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9]{10}')
    ]),
  });

  submit() {
    const obj= {
       "sponsor_code": this.sponsorForm.controls['sponsor_code'].value,
       "sponsor_name": this.sponsorForm.controls['sponsor_name'].value,
       "legal_sponsor_name":this.sponsorForm.controls['legal_sponsor_name'].value,
       "address_1": this.sponsorForm.controls['address_1'].value,
       "address_2": this.sponsorForm.controls['address_2'].value,
       "address_3": this.sponsorForm.controls['address_3'].value,
       "address_4": this.sponsorForm.controls['address_4'].value,
       "city": this.sponsorForm.controls['city'].value,
       "district": this.sponsorForm.controls['district'].value,
       "region": this.sponsorForm.controls['region'].value,
       "zip_code": this.sponsorForm.controls['zip_code'].value,
       "country": this.sponsorForm.controls['country'].value,
       "office_telephone": this.sponsorForm.controls['office_telephone'].value,
       "extension": this.sponsorForm.controls['extension'].value,
       "email": this.sponsorForm.controls['email'].value,
       "website": "string"
     }
     console.log(obj);
     
     if (this.isEdit) {
       this._cro.updateSponsorDetails(this.sponsorForm.value, this.id).subscribe(
         (data: any) => {
 
         },
         (err: any) => {
           alert('internal server error');
         }
       );
     }
     else {
       this._cro.CreateSponsorDetails(obj).subscribe(
         (data: any) => {
          alert('Sponsor Created Successfully')
          this.route.navigate(['/home/cro/sponsorGrid'])
         },
         (err: any) => {
 
         }
       )
     }
 
   }

  emailDomainValidator(control: FormControl): ValidationErrors | null {
    const email = control.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      if (!['gmail.com', 'officemails.com'].includes(domain)) {
        return { invalidDomain: true };
      }
    }
    return null; // Return null for valid email format
  }





}
