import { Component, OnInit } from '@angular/core';
import { CrosService } from '../cros.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.css']
})
export class AddSiteComponent implements OnInit {

  public isEdit: boolean = false;
  public id: any = '';
  getData: any;
  constructor(private _cro: CrosService,
    private _activatedRoute: ActivatedRoute,
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
  }
 
  public siteForm: FormGroup = new FormGroup({
    site_data_code: new FormControl(),
    site_data_name: new FormControl(),
    legal_site_data_name: new FormControl(),
    address_1: new FormControl(),
    address_2: new FormControl(),
    address_3: new FormControl(),
    address_4: new FormControl(),
    city: new FormControl(),
    district: new FormControl(),
    region: new FormControl(),
    zip_code: new FormControl(),
    country: new FormControl(),
    office_telephone: new FormControl(),
    extension: new FormControl(),
    email: new FormControl(),
    website: new FormControl(),
    mobile_telephone: new FormControl(),
  });
  ngOnInit(): void {
    
    
  }
  submit(){
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
      "website": this.siteForm.controls['website'].value
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

