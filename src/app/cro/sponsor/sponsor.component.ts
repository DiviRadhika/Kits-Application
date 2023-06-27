import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { SponsorService } from 'src/app/sponsor/sponsor.service';
import { CrosService } from '../cros.service';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent implements OnInit {
  public isEdit: boolean = false;
  public id: any = '';
  myData: { text: any; value: any; }[]= [];


  
 
  constructor(
    private route: Router,
    private _cro:CrosService,
    private _activatedRoute: ActivatedRoute,
    private admin: AdminService,
    private messageService: MessageService
   ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        _cro.getSponsorById(data.id).subscribe((data: any) => {
          this.sponsorForm.patchValue(data);
          console.log(data.country)
console.log(this.sponsorForm.controls['country'].setValue(data.country))
console.log(this.sponsorForm.controls['country'].setValue(data.country.value))
          this.sponsorForm.controls['country'].setValue(data.country)
          this.sponsorForm.controls['country'].setValue(data.country)
          this.sponsorForm.controls['sponsor_code'].disable()
          this.sponsorForm.controls['sponsor_name'].disable()
          this.sponsorForm.controls['legal_sponsor_name'].disable()
          this.sponsorForm.controls['email'].disable()
        });
      }
    });
  }
ngOnInit(): void {
  this.admin.country().subscribe((resp: any) => {
    this.myData = resp;
   
}); 
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
    sponsor_code: new FormControl("", [Validators.required]),
    sponsor_name: new FormControl("", [Validators.required]),
    legal_sponsor_name: new FormControl("", [Validators.required]),
    address_1: new FormControl("", [Validators.required]),
    address_2: new FormControl(""),
    address_3: new FormControl(""),
    address_4: new FormControl(""),
    city: new FormControl("", [Validators.required]),
    district: new FormControl("", [Validators.required]),
    region: new FormControl("", [Validators.required]),
    zip_code: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    office_telephone: new FormControl(""),
    extension: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),
    website:new FormControl(''),
    mobile_telephone:new FormControl(''),
  });

  submit() {
 
    if (this.sponsorForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.sponsorForm.controls).forEach(key => {
        this.sponsorForm.get(key)?.markAsTouched();
      });
     
      this.messageService.add({severity:'error', summary:'Error Message', detail:'Please Fill All Mandatory Fields'});
    }
 
 else {
    const obj:any= {
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
       "mobile_telephone": this.sponsorForm.controls['mobile_telephone'].value.toString(),    
       "extension": this.sponsorForm.controls['extension'].value,
       "email": this.sponsorForm.controls['email'].value,
       "website": this.sponsorForm.controls['website'].value,
       "user_id": sessionStorage.getItem('userid')
     }
     console.log(obj)
     
     if (this.isEdit) {
      obj.sponsor_id = this.id
      console.log(obj)
       this._cro.updateSponsorDetails(obj).subscribe(
         (data: any) => {
          setTimeout(() => {
            this.messageService.add({severity:'success', summary:'Success Message', detail:'Sponsor Updated Successfully'});
          }, 1000);
  
          this.route.navigate(['/home/cro/sponsorGrid'])
 
         },
         (err: any) => {
          this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
         }
       );
     }
     else {
       this._cro.CreateSponsorDetails(obj).subscribe(
         (data: any) => {
          setTimeout(() => {
            this.messageService.add({severity:'success', summary:'Success Message', detail:'Sponsor Created Successfully'});
          }, 1000);
          this.route.navigate(['/home/cro/sponsorGrid'])
         },
         (err: any) => {
          this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
 
         }
       )
     }
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
