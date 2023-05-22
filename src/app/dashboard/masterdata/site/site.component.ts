import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SiteService } from 'src/app/Services/SITE/site.service';


@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent {
  public isEdit:boolean=false;
  public id:any='';
  constructor(
    private _activatedRoute:ActivatedRoute,
    private _SiteService:SiteService){
      this._activatedRoute.params.subscribe((data:any)=>{
        if(data.id){
          this.isEdit=true;
          this.id=data.id;
          _SiteService.getSiteDetails(data.id).subscribe((data:any)=>{
            this.SiteForm.patchValue(data);
          });
        }
      });
    }
  

  public SiteForm:FormGroup= new FormGroup({
    site_data_code:new FormControl(),
    site_data_name:new FormControl(),
    legal_site_data_name:new FormControl(),
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
    mobile_telephone:new FormControl(),
    email: new FormControl(),
    website: new FormControl()
  
  });
  submit(){
    if(this.isEdit){
      this._SiteService.updateSiteDetails(this.SiteForm.value,this.id).subscribe(
        (data:any)=>{
          alert('updated successfully');
        },
        (err:any)=>{
          alert('internal server error');
        }
      );
    }
    else{
      this._SiteService.CreateSiteDetails(this.SiteForm.value).subscribe(
        (data:any)=>{
          alert('Site Details Created Successfully');
        },
        (err:any)=>{
          alert(' error')
        }
      )
    }
     
  }
}
