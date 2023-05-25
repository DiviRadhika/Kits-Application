import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SposorService } from 'src/app/Services/SPONSOR/sposor.service';
@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent {
  public isEdit: boolean = false;
  public id: any = '';


  
 
  constructor(
   

    
    
    private _activatedRoute: ActivatedRoute,
    private _SponsorService: SposorService) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        _SponsorService.getSponsorDetails(data.id).subscribe((data: any) => {
          this.SponsorForm.patchValue(data);
        });
      }
    });
  }


  shouldShowRequired(controlName: string): boolean {
    const control = this.SponsorForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }

  shouldShowLengthError(controlName: any): boolean {
    const control = this.SponsorForm.get(controlName);
    return control?.invalid && (control?.errors?.['minlength'] || control?.errors?.['maxlength']) && (control?.dirty || control?.touched) || false;
  }
  shouldShowPatternError(controlName: string): boolean {
    const control = this.SponsorForm.get(controlName);
    return control?.touched && control?.errors?.['pattern'];
  }
  shouldShowUrlError(controlName: string): boolean {
    const control = this.SponsorForm.get(controlName);
    return !!control?.hasError('pattern') && !!control?.value && (control?.dirty || control?.touched);
  }
  










  public SponsorForm: FormGroup = new FormGroup({
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




  submit() {
    if (this.isEdit) {
      this._SponsorService.updateSponsorDetails(this.SponsorForm.value, this.id).subscribe(
        (data: any) => {

        },
        (err: any) => {
          alert('internal server error');
        }
      );
    }
    else {
      this._SponsorService.CreateSponsorDetails(this.SponsorForm.value).subscribe(
        (data: any) => {

        },
        (err: any) => {

        }
      )
    }

  }

}
