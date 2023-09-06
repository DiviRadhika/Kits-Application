import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/data.service';
import { takeLast } from 'rxjs';
// import { AdminService } from '../admin.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  status: any[] = [];

  isEdit: boolean = false;

  // readonly passwordPattern: RegExp = /^(?=.?[A-Z])(?=.?[a-z])(?=.?[0-9])(?=.?[!@#$%^&*()]).{8,}$/;
  userForm: FormGroup = new FormGroup({
    first_name: new FormControl("", [Validators.required]),
    last_name: new FormControl(),
    password: new FormControl('', [
      Validators.required,
    
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)

    ]),
    role: new FormControl("", [Validators.required]),
    sId:new FormControl(""),
    email: new FormControl("", [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+(\.[^\s@]+)?$/)]),

    status: new FormControl(''),
  });

  options: string[] = ['Admin','CRO','Sponsor','CRA', 'Central Lab-Preparation', 'Central Lab-Verification', 'Central Lab-Distribution','Central Lab-Acknowledgement','Central Lab-Reports', ];
  id: any;
  getUserData: any;
  sponsorDetails: any[]= [];
  sponsor: boolean = false;
  site: boolean = false;
  showPassword = false;

  siteDetails: any;
  idValue: any;
  view: boolean = false;
  countries: { key: number; name: string; }[] | undefined;
  states: { key: any; name: any; }[] | undefined;
  // passwordControl!: FormControl<any>;
  private capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  
  
  

  

  constructor(
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private router: Router,
    private fb: FormBuilder,
    private _cro: CrosService,
    private messageService: MessageService,
    private dataService:DataService
  ) {

  }
  getStatesObservable$ = null;

  ngOnInit(): void {
    this.countries = this.dataService.getCountries();
    this.userForm.get('country')?.valueChanges.subscribe(country => {

      this.getStatesForCountry(country);
    });
 
    this.status = [{
      'label' : 'Active',  'id': 'active'
    },
    {'label' : 'In Active',  'id': 'inactive'}]
    // this.passwordControl = this.userForm.get('password') as FormControl;
    this.activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;


        this.adminService.getUserbyId(data.id).subscribe((data: any) => {
      
       
          this.getUserData = data;
          // this.getUserData.status = 'inactive'
          this.userForm.patchValue(this.getUserData);
    
          if(this.getUserData.role === 'admin' || this.getUserData.role === 'admin'){
            this.userForm.controls['role'].setValue('Admin')
          }
          this.userForm.controls['email'].disable();
          this.userForm.controls['role'].disable();
// this.roleChange(event);
          if(this.getUserData.role === 'CRO'){
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
        
          }
           else if(this.getUserData.role === 'Sponsor'){
          console.log(this.getUserData.sponsor_id)
            this.sponsor = true
            this.site = false
            this.getSponsorDetails()
            this.userForm.controls['sId'].setValue(this.getUserData.sponsor_id)
            this.userForm.controls['sId'].setValidators(Validators.required)
            this.userForm.controls['sId'].updateValueAndValidity()
           }
           else if(this.getUserData.role === 'CRA'){
          


            this.sponsor = false
            this.site = true
            this.getSitedetails()
            this.userForm.controls['sId'].setValidators(Validators.required)
            this.userForm.controls['sId'].updateValueAndValidity()
            this.userForm.controls['sId'].setValue(this.getUserData.site_id)
        
           }
           else if(this.getUserData.role === 'Central Lab-Preparation'){
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
           }
           else if(this.getUserData.role === 'Central Lab-Verification'){
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
           }
           else if(this.getUserData.role === 'Central Lab-Distribution'){
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
           }
           else if(this.getUserData.role === 'Central Lab-Acknowledgement'){
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
           }
           else if(this.getUserData.role === 'Central Lab-Reports'){
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
           }
           else if(this.getUserData.role === 'CRO'){
            this.sponsor = false
            this.site = false
            this.userForm.controls['sId'].clearValidators()
            this.userForm.controls['sId'].updateValueAndValidity()
        
           }
        });
      } else {
        this.isEdit = false;
      }
      if(data.val == 'view'){
        this.view = true
        this.userForm.disable()
        
      }
      else{
     
      }
    });
  }
  roleChange(event: any){

    this.idValue = event.target.value
  if(this.idValue === 'CRO' ){
    this.sponsor = false
    this.site = false
    this.userForm.controls['sId'].clearValidators()
    this.userForm.controls['sId'].updateValueAndValidity()

  }
   else if(this.idValue === 'Sponsor'){
    this.sponsor = true
    this.site = false
    this.getSponsorDetails()
    this.userForm.controls['sId'].setValidators(Validators.required)
    this.userForm.controls['sId'].updateValueAndValidity()

   }
   else if(this.idValue === 'CRA' ){
  
    this.sponsor = false
    this.site = true
    this.getSitedetails()
    this.userForm.controls['sId'].setValidators(Validators.required)
    this.userForm.controls['sId'].updateValueAndValidity()

   }
   else if(this.idValue === 'Central Lab'){
    this.sponsor = false
    this.site = false
    this.userForm.controls['sId'].clearValidators()
    this.userForm.controls['sId'].updateValueAndValidity()
   }
   else if(this.idValue === 'CRO'){
    this.sponsor = false
    this.site = false
    this.userForm.controls['sId'].clearValidators()
    this.userForm.controls['sId'].updateValueAndValidity()

   }
   else if(this.idValue === 'Central Lab-Distribution'){
    this.sponsor = false
    this.site = false
    this.userForm.controls['sId'].clearValidators()
    this.userForm.controls['sId'].updateValueAndValidity()

   }
   else if(this.idValue === 'Central Lab-Verification'){
    this.sponsor = false
    this.site = false
    this.userForm.controls['sId'].clearValidators()
    this.userForm.controls['sId'].updateValueAndValidity()

   }
   else if(this.idValue === 'Central Lab-Preparation'){
    this.sponsor = false
    this.site = false
    this.userForm.controls['sId'].clearValidators()
    this.userForm.controls['sId'].updateValueAndValidity()

   }
   else if(this.idValue === 'Admin' || this.idValue === 'admin'){
    this.sponsor = false
    this.site = false
    this.userForm.controls['sId'].clearValidators()
    this.userForm.controls['sId'].updateValueAndValidity()

   }

  }
  getStatesForCountry(country:any){
    const payload = {
      country: country
    }
   
    const getStatesObservable$ = this.dataService.getAllStatesAPI(payload).pipe(takeLast(1));;
    getStatesObservable$.subscribe((res: any) => {
      console.log(res)
      if(res && res.body && res.body.states) {
        this.states = this.dataService.getStates(res.body.states);
        // this.addToStatesList(res.body.states, country);
      }
      
    });

  }
  getSitedetails(){
    this._cro.getSites().subscribe((data:any)=>{
   
       this.siteDetails = data
     })
 
   }
   preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
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
  getSponsorDetails(){
    this._cro.getsponsors().subscribe(
      (data:any)=>{
      this.sponsorDetails = data
       console.log(data)
      },
      (err:any)=>{
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message}); }
    )
  }
  
reset(){
  if(this.isEdit === true){
    window.location.reload()
  }
  else{
  this.userForm.reset()
  }
}
  
  submit(): void {
    this.userForm.controls['first_name'].setValue(this.capitalizeFirstLetter(this.userForm.controls['first_name'].value));
    this.userForm.controls['last_name'].setValue(this.capitalizeFirstLetter(this.userForm.controls['last_name'].value));
  
   
    const emailvalue = this.userForm.controls['email'].value.toLowerCase();

    if (this.userForm.invalid) {
      Object.keys(this.userForm.controls).forEach((key) => {
        this.userForm.get(key)?.markAsTouched();

      });
      this.messageService.add({severity:'error', summary:'Error Message', detail:'Please Fill all Mandatory Fields'});
  
    } else {
      const userObj: any = {
        first_name: this.userForm.controls['first_name'].value,
        last_name: this.userForm.controls['last_name'].value,
        email: emailvalue,
        password: this.userForm.controls['password'].value,
        role: this.userForm.controls['role'].value,
        created_by:sessionStorage.getItem('userid')
      };
      if(this.idValue === 'CRA'){
        userObj.site_id = this.userForm.controls['sId'].value
        userObj.sponsor_id = ''
      }
      else if(this.idValue === 'Sponsor'){
        userObj.sponsor_id = this.userForm.controls['sId'].value
        userObj.site_id = ''
      }
      else{
        userObj.site_id  = ''
        userObj.sponsor_id  = ''
      }
       
        
        // 37e820d4-0098-4dd0-9c6b-a38db965062d
    
      if (this.isEdit) {
      
        userObj.status = this.userForm.controls['status'].value
        if(this.getUserData.role === 'CRA'){
          userObj.site_id = this.userForm.controls['sId'].value
          userObj.sponsor_id = ''
        }
        else if(this.getUserData.role === 'Sponsor' ){
          userObj.sponsor_id = this.userForm.controls['sId'].value
          userObj.site_id = ''
        }
        else{
          userObj.site_id  = ''
          userObj.sponsor_id  = ''
        }
        this.adminService.getUserUpdate( this.id,userObj).subscribe(
          (data: any) => {

           
          setTimeout(()=>{
            this.messageService.add({severity:'success', summary:'Success Message', detail:'User Updated successfully'});
          },1000);
            
             this.router.navigate(['/home/admin/userGrid']);
          },
          (err: any) => {
            this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
        
          }
        );
      } else {
        userObj.status = 'active'
      

        this.adminService.createUser(userObj).subscribe(
          (data: any) => {
   
            setTimeout(()=>{
              this.messageService.add({severity:'success', summary:'Success Message', detail:'User Created successfully'});
            },1000);
            this.router.navigate(['/home/admin/userGrid']);
            
           
          },
          (err: any) => {
  
            this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
            
          }
        );
        
      }
      // console.log(userObj)
    }
  }

}