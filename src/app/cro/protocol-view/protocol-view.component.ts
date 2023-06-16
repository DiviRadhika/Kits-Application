import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from '../cros.service';
import { ProtocolService } from '../protocol-registration/protocol-registration.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-protocol-view',
  templateUrl: './protocol-view.component.html',
  styleUrls: ['./protocol-view.component.css']
})
export class ProtocolViewComponent implements OnInit {

 

  kitId = 3;
  screenid = 4;
  protocolIdDetails: any;
  screenDetails: Array<any> = [];
  sMatDetails: Array<any> = [];
  visitDetails: Array<any> = [];
  vMatDetails: Array<any> = [];
  scount: any;
  vcount: any;
  displayValues: boolean = false;
  visitTabs: Array<any> = [];
  visitRecords: Array<any> = [];
  visitRecordsRow: Array<any> = [];
  tets: Array<any> = [];
  constructor(private route: Router,private protocolService: ProtocolService, private adminService: AdminService, private croService: CrosService, private formBuilder: FormBuilder) { };
  protocols: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];

  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  preprationData = ['InProgress', 'Completed']

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
    this.protocolService.getProtocol().subscribe((protocols) => {
      this.ProtoData(protocols);
    });
  
   
  
    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([this.addScreenKitData()])

    })
 

    this.VisitKitForm = this.formBuilder.group({

      visitKitList: this.formBuilder.array([])

    })

    this.listItems = [];
   
  }
  pCreate(){
    this.route.navigate(['/home/cro/protocolRegistration'])
  }
 
  getprotocolDetails(id: any) {

    this.protocolService.getProtocolId(id.target.value).subscribe((protocols) => {
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
      // console.log(this.visitDetails);
      console.log(this.vMatDetails, 'details');
      this.visitTabs = []
      this.visitRecords = []
      this.visitRecordsRow = []
  this.tets = []
      this.vMatDetails.forEach((tabs: any) => {
      this.tets.push(tabs.selectedLabTests)
        this.visitTabs.push(tabs.visits);
        this.visitTabs.forEach((visitRecord: any) => {
        
          this.visitRecords.push(visitRecord);

        });
      });
    console.log(this.tets);
    

      console.log(this.visitRecords.length, 'records');
      this.visitRecords.forEach((visitRecordrow: any) => {
        this.visitRecordsRow.push(visitRecordrow);
      });

      console.log(this.visitRecordsRow, 'row');
      for (let i = 1; i <= this.visitTabs.length; i++)
      { 
      this.addCard()
      
      this.addRow1(2)
    
     } 
    });

  
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

  addScreenKitData() {

    return this.formBuilder.group({
      ckitId: [''],
      kitId: [''],
      prepration: [''],

    })
  }

  // onVisitKitAdd() {

  //   //this.VisitKitForm.get('labTestsList').controls.push(this.addVisitKitData());
  //   const control1 = this.VisitKitForm.get('visitKitList') as FormArray;
  //   control1.push(this.addVisitKitData());
  //   console.log(this.VisitKitForm.get('visitKitList').controls);
  // }
  showsc() {
    this.screening = true;
    this.visit = false
  }
  showv() {
    // this.addVisitKit()
    this.screening = false;
    this.visit = true

  }
  addVisitKitData() {
    return this.formBuilder.group({
      ckitId: [''],
      kitId: [''],
      prepration: [''],

    })
  }

  ProtoData(Protocols: any) {
    Protocols.forEach((protocol: any) => {
      this.protocols.push(protocol);

  
  
    });

    console.log(this.protocols);
  }

 



  SubmitData() {
  console.log(this.VisitKitForm.value);
  
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
      (data: any) => {
        alert('protocol created successfully');
      },
      (err: any) => {
        alert('internal server err');
      }
    );
  }

  cards: { form: FormGroup }[] = [];
  visits(value: any){
    console.log(value.data);
    
    // this.valueVisit= value
    // this.listItems = []; 
   
  }



  addCard() {
    const initialRowsCount = this.cards.length + 1; // Calculate the desired number of initial rows based on index
    const rowsArray = new FormArray([]);
    const cardForm = this.formBuilder.group({
      rows: rowsArray
    });
    this.cards.push({ form: cardForm });
  }

    
getMaterialId(cardIndex: number, rowIndex: number): string {
  const cardFormArray = this.getRowsFormArray(cardIndex);
  const rowFormGroup = cardFormArray.at(rowIndex) as FormGroup;
  return rowFormGroup.get('material_id')?.value;
}
  addRow1(cardIndex: number) {
    const cardFormArray = this.getRowsFormArray(cardIndex);
    cardFormArray.push(this.createRow());
  }
  deleteRow(cardIndex: number, rowIndex: number) {
    const cardFormArray = this.getRowsFormArray(cardIndex);
    cardFormArray.removeAt(rowIndex);
  }

  createRow(): FormGroup {
    return this.formBuilder.group({
      ckitId: [''],
      kitId: [''],
      prepration: [''],
    });
  }
  
  getRowsFormArray(cardIndex: number): FormArray {
    const cardForm = this.cards[cardIndex].form;
    return cardForm.get('rows') as FormArray;
  }
  getRows(cardIndex: number): FormArray {
    const card = this.cards[cardIndex];
    return card.form.get('rows') as FormArray;
  }
 
  onSubmit() {
    const formData = [];
  
    // Iterate over the cards and access their form values
    for (const card of this.cards) {
      const formValues = card.form.value;
      formData.push(formValues);
    }
    console.log(formData);
    
    // this.croService.sendFormData(formData);

  }

 
 

  
  
  
}





 






