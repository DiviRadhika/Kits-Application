import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-crocreate',
  templateUrl: './crocreate.component.html',
  styleUrls: ['./crocreate.component.css']
})
export class CROcreateComponent implements OnInit {

  public isEdit: boolean = false;
  public id: any = '';
  getcroData: any;
  constructor(private admin: AdminService,
    private _activatedRoute: ActivatedRoute, private router:Router
  ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        admin.getCrobyId(data.id).subscribe((data: any) => {
          this.getcroData = data
          this.CroForm.patchValue(data)
          this.CroForm.controls['cro_code'].disable()
          this.CroForm.controls['cro_name'].disable()
          this.CroForm.controls['legal_cro_name'].disable()
          this.CroForm.controls['email'].disable()
        
        });

      }
    });
  }

  public CroForm: FormGroup = new FormGroup({
    cro_code: new FormControl(),
    cro_name: new FormControl(),
    legal_cro_name: new FormControl(),
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
  submit() {
    const obj: any = {
      "cro_code": this.CroForm.controls['cro_code'].value,
      "cro_name": this.CroForm.controls['cro_name'].value,
      "legal_cro_name": this.CroForm.controls['legal_cro_name'].value,
      "address_1": this.CroForm.controls['address_1'].value,
      "address_2": this.CroForm.controls['address_2'].value,
      "address_3": this.CroForm.controls['address_3'].value,
      "address_4": this.CroForm.controls['address_4'].value,
      "city": this.CroForm.controls['city'].value,
      "district": this.CroForm.controls['district'].value,
      "region": this.CroForm.controls['region'].value,
      "zip_code": this.CroForm.controls['zip_code'].value,
      "country": this.CroForm.controls['country'].value,
      "office_telephone": this.CroForm.controls['office_telephone'].value,
      "mobile_telephone": this.CroForm.controls['mobile_telephone'].value,
      "extension": this.CroForm.controls['extension'].value,
      "email": this.CroForm.controls['email'].value,
      "website": this.CroForm.controls['website'].value
    }  
    if (this.isEdit) {
      obj.cro_id= this.id
      this.admin.updateCroDetaild(obj).subscribe(
        (data: any) => {
          alert(' CRO Details updated successfully');
          this.router.navigate(['/home/admin/croGrid'])
        },
        (err: any) => {
          alert("server errorr")
        }
      );
    }
    else {
      this.admin.CreateCroDetails(obj).subscribe(
        (data: any) => {
          alert("CRO Details Created Successfully");
        this.router.navigate(['/home/admin/croGrid'])
        },
        (err: any) => {
          alert("err")
        }
      )
    }
  }
}
