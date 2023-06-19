import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormsModule, FormArray, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-kit-verification',
  templateUrl: './kit-verification.component.html',
  styleUrls: ['./kit-verification.component.css']
})
export class KitVerificationComponent implements OnInit {


  protocolIdDetails: any;
  screenDetails: Array<any> = [];
  sMatDetails: Array<any> = [];
  visitDetails: Array<any> = [];
  vMatDetails: Array<any> = [];
  scount: any;
  vcount: any;
  displayValues: boolean = false;

  tets: Array<any> = [];

  tabs: any[] = [];

  count = 2;
  allTabsData: any[] = [];
  index: any;
  indexvalue: any;
  vmdetails: any[] = [];
  uuid: any;
  skDetails: any[] = [];
  vkDetails: any;
  value: any;



  constructor(private protocolService: ProtocolService, private adminService: AdminService, private croService: CrosService, private formBuilder: FormBuilder) {



  };
  protocols: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];

  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  preprationData = ['Not Verified', 'Verified']
  kitIdv: any = ''
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
  sitesForm: any;
  ScreenKitForm: any;
  VisitKitForm: any;
  customerFormGroup: any;
  listItems: string[] = [];
  protoId: any
  protoName: any
  labMatTestsList: Array<any> = [];
  labMatList: any;
  materials: any;
  selectedValuev: any;
  selectedOption: any;

  public preparationForm: FormGroup = new FormGroup({
    protocolId: new FormControl("", [Validators.required]),
    protocol_name: new FormControl("", [Validators.required]),
  });
  ngOnInit() {

    this.protocolService.getPreparation().subscribe((protocols) => {
      console.log(protocols);

      this.ProtoData(protocols);
    });



    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([])
    });



  }
  getprotocolDetails(id: any) {
    this.scount = ''
    this.protocolService.getProtocolId(id.target.value).subscribe((protocols) => {
      this.uuid = id.target.value;
      this.protocolService.getPreparationById(id.target.value).subscribe((protocolsData) => {

        this.skDetails = protocolsData.data.screening_kit_details
        this.vkDetails = protocolsData.data.visit_kit_details
        console.log(this.vkDetails);


      });
      console.log(protocols);
      this.displayValues = true;
      this.protocolIdDetails = protocols.protocol
      this.protoName = this.protocolIdDetails.protocol_name
      this.preparationForm.controls['protocol_name'].disable()
      this.preparationForm.controls['protocol_name'].setValue(this.protoName)
      this.screenDetails = protocols.screening_kit_details[0].lab_test_ids
      this.sMatDetails = protocols.screening_kit_details[0].meterial_details
      this.visitDetails = protocols.visit_kit_details[0].lab_test_ids
      this.vMatDetails = protocols.visit_kit_details[0].meterial_details
      this.scount = this.protocolIdDetails.no_of_screens
      this.vcount = this.protocolIdDetails.no_of_visits
      console.log(this.vMatDetails, 'details');

      this.tets = []

      this.vMatDetails.forEach((tabs: any) => {
        tabs.visitKitFormGroup = this.formBuilder.group({

          visitKitList: this.formBuilder.array([]),
        });
        const visitKitListArray = tabs.visitKitFormGroup.get('visitKitList') as FormArray;
        for (let i = 1; i <= this.vcount; i++) {
          visitKitListArray.push(this.createVisitKitGroup());
          console.log(tabs.visitKitFormGroup[i]);
        }
        tabs.visitsList = visitKitListArray
        for (let i = 0; i < this.vMatDetails.length; i++) {
          const tabs = this.vMatDetails[i];
          tabs.visitKitFormGroup = this.formBuilder.group({
            visitKitList: this.formBuilder.array([]),
          });
          const visitKitListArray = tabs.visitKitFormGroup.get('visitKitList') as FormArray;

          for (let j = 0; j < this.vcount; j++) {
            visitKitListArray.push(this.createVisitKitGroup());




          }

          tabs.visitsList = visitKitListArray;
          this.tets.push(tabs.selectedLabTests);
        }

        this.tets.push(tabs.selectedLabTests)
      });

      for (let i = 1; i <= this.scount; i++) {
        this.adjustScreenKitRows(this.scount);
      }

    });



  }



  getformGroup(i: any) {
    return this.vMatDetails.at(i).visitKitFormGroup as FormGroup

  }




  createVisitKitGroup() {

    return this.formBuilder.group({

      status: ['Not Verified']

    });

  }


  adjustScreenKitRows(count: number) {
    const screenKitList = this.ScreenKitForm.get('screenKitList') as FormArray;
    const currentRowCount = screenKitList.length;

    if (count < currentRowCount) {
      // Remove excess rows
      for (let i = currentRowCount - 1; i >= count; i--) {
        screenKitList.removeAt(i);
      }
    } else if (count > currentRowCount) {
      // Add new rows
      for (let i = currentRowCount; i < count; i++) {
        this.onScreenKitAdd(i);
      }
    }


  }


  addScreenKit(record: any) {
    this.ScreenKitForm.get('screenKitList').push(this.addScreenKitData(record));
    console.log(this.ScreenKitForm.controls);
  }


  onScreenKitAdd(rec: any) {

    const control1 = this.ScreenKitForm.get('screenKitList') as FormArray;
    control1.push(this.addScreenKitData(rec));

  }



  addScreenKitData1() {
    console.log(this.uuid);
    this.protocolService.getPreparationById(this.uuid).subscribe((protocolsData) => {
      console.log(protocolsData);
      this.skDetails = protocolsData.data.screening_kit_details;
      this.vkDetails = protocolsData.data.visit_kit_details;
      console.log(this.vkDetails);

      outerLoop:
      for (let m = 0; m < this.skDetails.length; m++) {
        console.log(1);

        for (let n = 0; n < this.skDetails[m].length; n++) {
          console.log(m, n);
          console.log(`${this.skDetails[m][n].kitId}`);

          if (n < this.vkDetails[m].length) {

            continue outerLoop;
          }

          const visitKitGroup = this.formBuilder.group({
            ckitId: [`${this.vkDetails[m][n].kitId}`],
            kitId: [`${m}${n}`],
            prepration: [''],
            status: ['Not Verified']
          });


          visitKitGroup.get('kitId')?.patchValue(`${m}${n}`);



        }
      }

    });
  }

  addScreenKitData(record: string) {


    return this.formBuilder.group({

      status: ['Not Verified']

    });
  }




  ProtoData(Protocols: any) {
    Protocols.forEach((protocol: any) => {
      this.protocols.push(protocol);

    });

    console.log(this.protocols);
  }



  SubmitData() {
    console.log(this.skDetails);
    
    this.vmdetails = []
    for (let i = 0; i < this.vMatDetails.length; i++) {
      this.vmdetails.push(this.vMatDetails[i].visitsList.value)

    }


    for (let i = 0; i < this.vkDetails.length; i++) {
      // for (let j = 0; i < this.vkDetails[i].length; j++) {
      // console.log(this.vkDetails[i], this.vMatDetails[j].visitsList.value[j].status);

      // this.vkDetails[j].push({"verification_status": 'val'})
      console.log(this.vMatDetails[i].visitsList.value[i].status);

      this.vkDetails[i].forEach((protocol: any, index: any) => {
        for (let j = 0; j < this.vMatDetails.length; j++) {
          // this.vMatDetails.forEach((data:any,index: any)=>{
          console.log(this.vMatDetails[j].visitsList.value[index].status);
          protocol.verification_status = this.vMatDetails[i].visitsList.value[index].status
        }

      })

    }
 
   


      this.skDetails.forEach((protocol: any, index: any) => {
   
          // this.vMatDetails.forEach((data:any,index: any)=>{
        
          protocol.verification_status = this.ScreenKitForm.value.screenKitList[index].status
        })

    

   
        console.log(this.skDetails); 
  
    console.log(this.vkDetails);
console.log( this.ScreenKitForm.value.screenKitList);


    //   this.vkDetails.push()

    // console.log(this.vMatDetails.visitsList.FormArray.value)
    const data = {
      "protocol_id": this.uuid,
      "screening_kit_details": this.skDetails,
      "visit_kit_details": this.vkDetails


    }
 

    console.log(data);

    this.protocolService.postProtocol(data).subscribe(
      (data: any) => {
        alert('protocol created successfully');
      },
      (err: any) => {
        alert(err.errorr.message)
      }
    );

  }




}






