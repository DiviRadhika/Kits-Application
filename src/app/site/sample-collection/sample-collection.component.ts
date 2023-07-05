import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.css']
})
export class SampleCollectionComponent implements OnInit {

  statusData = ['Pending', 'Collected']
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
  sponsers: Array<any> = [];
  email: string | null;
  ID: any;
  date: string;



  constructor(private protocolService: ProtocolService, private messageService: MessageService, private croService: CrosService, private formBuilder: FormBuilder) {

    this.email =sessionStorage.getItem('email')
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Month starts from 0, so add 1 to get the actual month
    const day = currentDate.getDate();

    this.date = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;


  };
  protocols: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];
  uniqueCombinedArray : Array<any> = [];
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
    // this.sponsersData()
    this.croService.getSites().subscribe((sites) => {

      this.sponsersData(sites);

    });

   
      this.croService.getSites().subscribe((data:any)=>{
        //  console.log(data)
        //  this.siteDetails = data
        //  this.allSiteDetails = data


         data.forEach((sponser: any) => {


          // this.sponsers.push(sponser);
          data.forEach((res: any) => {
            if(data.email == this.email){
       
            this.ID = sponser.site_data_code
            
            }
          });
        });
      
       })
   
    
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
        console.log(protocolsData);
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

      patientId: [''],
      collection: ['Pending']



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




  addScreenKitData(record: string) {


    return this.formBuilder.group({
      patientId: [''],
      collection: ['Pendig']



    });
  }




  ProtoData(Protocols: any) {
    Protocols.data.forEach((protocol: any) => {
      this.protocols.push(protocol);

    });

    console.log(this.protocols);
  }


  sponsersData(sponsers: any) {

    sponsers.forEach((sponser: any) => {


      this.sponsers.push(sponser);
      this.sponsers.forEach((res: any) => {
        if(sponser.email == this.email){
        console.log(sponser.email, this.email)
        this.ID = sponser.site_data_code
        
        }
      });
    });

      console.log(this.sponsers)

    }

  SubmitData() {
      console.log(this.skDetails);

      this.vmdetails = []
    for(let i = 0; i< this.vMatDetails.length; i++) {
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
          protocol.patientId = this.vMatDetails[i].visitsList.value[index].patientId
          protocol.collection = this.vMatDetails[i].visitsList.value[index].collection
          protocol.site_id= this.ID

        }

      })

    }

    this.skDetails.forEach((protocol: any, index: any) => {
      protocol.site_id = this.ID
      protocol.patientId = this.ScreenKitForm.value.screenKitList[index].patientId
      protocol.collection = this.ScreenKitForm.value.screenKitList[index].collection
    })


console.log(this.ID);



    const data = {
      "protocol_id": this.uuid,
      "screening_kit_details": this.skDetails,
      "visit_kit_details": this.vkDetails


    }


    console.log(data);

    this.protocolService.updatePreparationById(data).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail:'Sample Collection Updated successfully' });
      },
      (err: any) => {
       
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail:err.errorr.message });
        
      }
    );
  }




}
















