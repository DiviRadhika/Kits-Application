import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-sample-acknowledgement',
  templateUrl: './sample-acknowledgement.component.html',
  styleUrls: ['./sample-acknowledgement.component.css']
})
export class SampleAcknowledgementComponent implements OnInit {
  labelid: string='';
  kitId = 5;
  screenid = 4;

  constructor(private protocolService: ProtocolService, private formBuilder: FormBuilder) { };
  protocols: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];

  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  statusData =['Pending', 'Recieved']

  /* nmModel Variables */
  selected_protocol_id: any;
  // selected_sponsor_id: any;
  // selected_cro_id: any;
  selected_sites_num: any;
  selected_patients_num: any;
  selected_site_id: any;
  selected_patient_name: any;
  selected_patient_visits: any;
  selected_skit_count: any;
  selected_vkit_count: any;
  selected_vkit_variant: any;
  screening: boolean = true;
  visit: boolean = false;
  sitesForm:any;
  ScreenKitForm:any;
  VisitKitForm:any;
  customerFormGroup:any;
  listItems: string[]=[];

  ngOnInit() {
    this.protocolService.getProtocol().subscribe((protocols) => {
      this.ProtoData(protocols);
    });
 
   

    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([this.addScreenKitData()])

    })
    for(let i=0; i<this.screenid-1;i++){
      this.addScreenKit()

    }
    //console.log(this.ScreenKitForm);
    this.VisitKitForm = this.formBuilder.group({

      visitKitList: this.formBuilder.array([])

    })
    this.listItems = []; 
    for (let i = 0; i <= this.kitId-1; i++)
     { this.listItems.push(`Item ${i}`); 
     this.addVisitKit()

  
    } 

  }


  addScreenKit() {
    this.ScreenKitForm.get('screenKitList').push(this.addScreenKitData());
    console.log(this.ScreenKitForm.controls);
  }

  addVisitKit() {
    this.VisitKitForm.get('visitKitList').push(this.addVisitKitData());
    
  }
  onScreenKitAdd() {
    const control1 = this.ScreenKitForm.get('screenKitList') as FormArray;
    control1.push(this.addScreenKitData());
  }
  onVisitKitAdd() {
    const control1 = this.VisitKitForm.get('visitKitList') as FormArray;
    control1.push(this.addVisitKitData());
  }
  addScreenKitData() {
    return this.formBuilder.group({
      kitId: ['567812'],
      siteId:['s0006'],
      cKitId:['c123'],
      patientId:['p123'],
      collected:['collected'],
      remarks:[''],
      acknowldgement:[''],
    })
  }
  addVisitKitData() {
    return this.formBuilder.group({
      kitId: ['567812'],
      siteId:['s0006'],
      cKitId:['c123'],
      patientId:['p123'],
      collected:['collected'],
      remarks:[''],
      acknowldgement:[''],
   
    })
  }
  // For getting data of uploadded file and convering into base64
  uploadFile(evt: any) {
    this.files1 = evt.target.files;
    const file = this.files1[0];
    this.file2 = this.files1[0].name;
    const fileSize = this.files1[0].size;
    if (fileSize >= 1084) {
    }
    if (this.files1 && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded1(readerEvt: any) {
    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.bas2 = 'data:text/html;base64,' + this.base64textString;
    this.bas2 = this.bas2.substring(this.bas2.indexOf(',') + 1);
    console.log(this.bas2);
  }


  showsc(){
    this.screening = true;
    this.visit = false
  }
  showv(){
    // this.addVisitKit()
    this.screening = false;
    this.visit = true
    // for(let i=0; i<this.kitId-1;i++){
    //   this.addVisitKit()

    // }
  }


  ProtoData(Protocols:any) {
    Protocols.forEach((protocol: any) => {
      this.protocols.push(protocol);
    });

    console.log(this.protocols);
  }

  SubmitData() {
    console.log(this.selected_protocol_id);
    // console.log(this.selected_sponsor_id);
    // console.log(this.selected_cro_id);
    console.log(this.selected_sites_num);
    console.log(this.selected_patients_num);
    /*console.log( this.selected_site_id);
    console.log( this.selected_patient_name);
    console.log( this.selected_patient_visits);*/

    console.log(this.selected_skit_count);
    console.log(this.selected_vkit_count);
    console.log(this.selected_vkit_variant);
    console.log(this.sitesForm.value);
    console.log(this.ScreenKitForm);
    console.log(this.VisitKitForm);

    const data =
    {
      protocol_id: this.selected_protocol_id,
      // sponser_id: this.selected_sponsor_id,
      // cro_id: this.selected_cro_id,
      no_of_sites: Number(this.selected_sites_num),
      total_patients: Number(this.selected_patients_num),
      site_data: this.sitesForm.value.sites,
      screening_kit_count: Number(this.selected_skit_count),
      screening_kit_lab_test_details: this.ScreenKitForm.value.labTestsList,
      visit_kit_count: Number(this.selected_vkit_count),
      visit_kit_type: this.selected_vkit_variant,
      visit_kit_details: this.VisitKitForm.value.labTestsList
    }

    console.log(data);

    this.protocolService.postProtocol(data).subscribe(
      (data:any) => {
        alert('protocol created successfully');
      },
      (err:any)=>{
        alert('internal server err');
      }
      );
  }


 

}



