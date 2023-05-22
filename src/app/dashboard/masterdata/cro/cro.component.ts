import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CroService } from 'src/app/Services/CRO/cro.service';

@Component({
  selector: 'app-cro',
  templateUrl: './cro.component.html',
  styleUrls: ['./cro.component.css']
})
export class CroComponent {
  public isEdit: boolean = false;
  public id: any = '';
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _CroService: CroService) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        _CroService.getCroDeatils(data.id).subscribe((data: any) => {
          this.CroForm.patchValue(data);
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
  });
  submit(){
    if(this.isEdit){
      this._CroService.updateCroDetaild(this.CroForm.value,this.id).subscribe(
        (data:any)=>{
          alert('updated successfully');
        },
        (err:any)=>{
          alert("server errorr")
        }
      );
    }
    else{
      this._CroService.CreateCroDetails(this.CroForm.value).subscribe(
        (data:any)=>{
          alert("CRO Deatails Created Successfully");
        },
        (err:any)=>{
          alert("err")
        }
      )
    }
  }
}
