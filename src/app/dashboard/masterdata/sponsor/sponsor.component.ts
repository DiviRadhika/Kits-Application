import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SposorService } from 'src/app/Services/SPONSOR/sposor.service';

@Component({
  selector: 'app-sponsor',
  templateUrl: './sponsor.component.html',
  styleUrls: ['./sponsor.component.css']
})
export class SponsorComponent {
    public isEdit:boolean=false;
    public id:any='';
    constructor(
      private _activatedRoute:ActivatedRoute,
      private _SponsorService:SposorService){
        this._activatedRoute.params.subscribe((data:any)=>{
          if(data.id){
            this.isEdit=true;
            this.id=data.id;
            _SponsorService.getSponsorDetails(data.id).subscribe((data:any)=>{
              this.SponsorForm.patchValue(data);
            });
          }
        });
      }
      shouldShowRequired(controlName: string): boolean {
        const control = this.SponsorForm.get(controlName);
        return control?.invalid && (control?.dirty || control?.touched) || false;
      }
      
      shouldShowLengthError(controlName: string): boolean {
        const control = this.SponsorForm.get(controlName);
        return control?.invalid && (control?.errors?.['minlength'] || control?.errors?.['maxlength']) && (control?.dirty || control?.touched) || false;
      }
      
      
    

    public SponsorForm:FormGroup= new FormGroup({
      sponsor_code:new FormControl("",[Validators.required,Validators.maxLength(15),Validators.minLength(5)]),
      sponsor_name:new FormControl(),
      legal_sponsor_name:new FormControl(),
      address_1:new FormControl(),
      address_2:new FormControl(),
      address_3:new FormControl(),
      address_4: new FormControl(),
      city: new FormControl(),
      district: new FormControl(),
      region: new FormControl(),
      zip_code: new FormControl(),
      country: new FormControl(),
      office_telephone: new FormControl(),
      extension: new FormControl(),
      email: new FormControl(),
      website: new FormControl()
    
    });
    submit(){
      if(this.isEdit){
        this._SponsorService.updateSponsorDetails(this.SponsorForm.value,this.id).subscribe(
          (data:any)=>{
            
          },
          (err:any)=>{
            alert('internal server error');
          }
        );
      }
      else{
        this._SponsorService.CreateSponsorDetails(this.SponsorForm.value).subscribe(
          (data:any)=>{
        
          },
          (err:any)=>{
           
          }
        )
      }
       
    }
  
}
