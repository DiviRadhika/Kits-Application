import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProtocolService } from 'src/app/Services/CRO-PROTOCOL/protocol.service';

@Component({
  selector: 'app-protocol-registration',
  templateUrl: './protocol-registration.component.html',
  styleUrls: ['./protocol-registration.component.css']
})
export class ProtocolRegistrationComponent {
  selectedOption!: string;
  options: string[] = ['Option 1', 'Option 2', 'Option 3'];
  public KitType: any = ''
  public isEdit: boolean = false;
  public id: any = '';
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _protocolService: ProtocolService
  ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        _protocolService.getProtocolDetails(data.id).subscribe((data: any) => {
          this.ProtocolForm.patchValue(data);
        });
      }
    });
  }
  public ProtocolForm: FormGroup = new FormGroup({

    protocol_id: new FormControl(),
    sponsor_id: new FormControl(),
    cro_id: new FormControl(),
    no_of_sites: new FormControl(),
    total_patients: new FormControl(),
    site_ids: new FormControl(),


    screening_kit_count: new FormControl(),
    screening_kit_lab_tests: new FormControl(),
    visit_kit_count: new FormControl(),
    visit_kit_details:new FormControl(),

    no_of_visits: new FormControl(),
    kit_type: new FormControl(),
    lab_id: new FormControl()
  });
  submit(){
    if(this.isEdit){
      this._protocolService.updateProtocolDetails(this.ProtocolForm.value,this.id).subscribe(
        (data:any)=>{
          alert('update successfully');
        },
        (err:any)=>{
          alert("internal server error")
        }
      );
    }
    else{
      this._protocolService.CreateProtocolDetails(this.ProtocolForm.value).subscribe(
        (data:any)=>{
          alert('cro protocol Details Created Successfully');
        },
        (err:any)=>{
          alert(' error')
        }
      )
    }
  }
}
