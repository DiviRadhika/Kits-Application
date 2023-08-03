import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormBuilder, FormArray } from '@angular/forms';
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
  myData: { text: any; value: any; }[] = [];
  mobile: any;
  sponsorDetails: [] = [];
  autoCode = '';
  contactForm: any
  public sponsorForm: FormGroup = new FormGroup({
    sp_auto_code: new FormControl(''),
    sponsor_code: new FormControl("", [Validators.required]),
    sponsor_name: new FormControl("", [Validators.required]),
    legal_sponsor_name: new FormControl("", [Validators.required]),
    address_1: new FormControl("", [Validators.required]),
    address_2: new FormControl(""),
    city: new FormControl("", [Validators.required]),
    district: new FormControl(""),
    region: new FormControl("", [Validators.required]),
    zip_code: new FormControl("", [Validators.required]),
    country: new FormControl("", [Validators.required]),
    office_telephone: new FormControl(""),
    extension: new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),
    website: new FormControl(''),
    mobile_telephone: new FormControl(''),
    oemails: new FormControl(''),
  });
  editcontactsForm: any
  contactDetails: [] = []
  view: boolean = false;
  table: boolean = false;
  tableE: boolean = false;


  constructor(
    private route: Router,
    private _cro: CrosService,
    private _activatedRoute: ActivatedRoute,
    private admin: AdminService,
    private messageService: MessageService,
    private formBuilder: FormBuilder
  ) {
    this._activatedRoute.params.subscribe((data: any) => {

      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        _cro.getSponsorById(data.id).subscribe((data: any) => {
          this.contactDetails = data.notifier_details
          console.log(this.contactDetails.length);
          if(this.contactDetails.length > 0){
            this.tableE = true
          }

          this.setContactFormValues(this.contactDetails);
          this.sponsorForm.patchValue(data);
          console.log(data.country)
          this.sponsorForm.controls['country'].setValue(data.country)
          this.sponsorForm.controls['country'].setValue(data.country)
          this.sponsorForm.controls['sponsor_code'].disable()
          // this.sponsorForm.controls['sponsor_name'].disable()
          // this.sponsorForm.controls['legal_sponsor_name'].disable()
          this.sponsorForm.controls['email'].disable()
        });

      }
      if (data.val == 'view') {
        this.view = true
        this.sponsorForm.disable()

      }
      else {

      }
    });
  }
  ngOnInit(): void {
    this.admin.country().subscribe((resp: any) => {
      this.myData = resp;

    });
    this.contactForm = this.formBuilder.group({
      contacts: this.formBuilder.array([])
    });

    this.editcontactsForm = this.formBuilder.group({
      editcontacts: this.formBuilder.array([]),
    });



    this.getSponsorDetails()
  }
  removeSponsor(j: number) {
    this.contactForm.get('contacts').removeAt(j);
  }
  setContactFormValues(contacts: any[]) {
    const contactFormArray = this.editcontactsForm.get('editcontacts') as FormArray;

    while (contactFormArray.length) {
      contactFormArray.removeAt(0);
    }

    this.contactDetails.forEach((contact: any) => {
      console.log(contact)
      const editcontactsForm = this.formBuilder.group({
        first_name: [contact.first_name],
        last_name: [contact.last_name],
        email: [contact.email],
        contact: [contact.contact],
        designation: [contact.designation]
        // name: [contact.name],
        // email: [contact.email],
      });

      contactFormArray.push(editcontactsForm);
    });
    if (this.view === true) {
      contactFormArray.controls.forEach((control) => {
        control.disable();
      });

      this.editcontactsForm.disable();
    }
  }
  get contactControls() {
    return (this.contactForm.get('contacts') as FormArray).controls;
  }

  createContact() {
    return this.formBuilder.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      contact: [''],
      designation: ['']

    });
  }

  addContact() {
    this.table = true
    const contacts = this.contactForm.get('contacts') as FormArray;
    contacts.push(this.createContact());
  }
  addContacte() {
    this.tableE = true
    const contacts = this.editcontactsForm.get('editcontacts') as FormArray;
    contacts.push(this.createContact());
  }
  getSponsorDetails() {
    this._cro.getsponsors().subscribe(
      (data: any) => {
        this.sponsorDetails = data.length + 1
        this.autoCode = 'SP00' + this.sponsorDetails
        this.sponsorForm.controls['sp_auto_code'].setValue(this.autoCode)
        this.sponsorForm.controls['sp_auto_code'].disable()
      },
      (err: any) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
      }
    )
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



  submit() {
    console.log(this.contactForm.value, sessionStorage.getItem('userid'))
    if (this.sponsorForm.controls['mobile_telephone'].value === '' || this.sponsorForm.controls['mobile_telephone'].value === null) {
      this.mobile = ''
    }
    else {
      this.mobile = this.sponsorForm.controls['mobile_telephone'].value.toString()
    }

    if (this.sponsorForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.sponsorForm.controls).forEach(key => {
        this.sponsorForm.get(key)?.markAsTouched();
      });

      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill All Mandatory Fields' });
    }

    else {
      const obj: any = {
        "sponsor_code": this.sponsorForm.controls['sp_auto_code'].value,
        "existing_sponsor_code": this.sponsorForm.controls['sponsor_code'].value,
        "sponsor_name": this.sponsorForm.controls['sponsor_name'].value,
        "legal_sponsor_name": this.sponsorForm.controls['legal_sponsor_name'].value,
        "address_1": this.sponsorForm.controls['address_1'].value,
        "address_2": this.sponsorForm.controls['address_2'].value,
        "city": this.sponsorForm.controls['city'].value,
        "district": this.sponsorForm.controls['district'].value,
        "region": this.sponsorForm.controls['region'].value,
        "zip_code": this.sponsorForm.controls['zip_code'].value,
        "country": this.sponsorForm.controls['country'].value,
        "office_telephone": this.sponsorForm.controls['office_telephone'].value,
        "mobile_telephone": this.mobile,
        "extension": this.sponsorForm.controls['extension'].value,
        "email": this.sponsorForm.controls['email'].value,
        "website": this.sponsorForm.controls['website'].value,
        "user_id": sessionStorage.getItem('userid'),





      }

      if (this.isEdit) {
        obj.sponsor_id = this.id
        obj.notifier_details = this.editcontactsForm.value.editcontacts
        this._cro.updateSponsorDetails(obj).subscribe(
          (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sponsor Updated Successfully' });
            }, 1000);

            this.route.navigate(['/home/cro/sponsorGrid'])

          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });
          }
        );
      }
      else {
        obj.notifier_details = this.contactForm.value.contacts
        this._cro.CreateSponsorDetails(obj).subscribe(

          (data: any) => {
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sponsor Created Successfully' });
            }, 1000);
            this.route.navigate(['/home/cro/sponsorGrid'])
          },
          (err: any) => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });

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
