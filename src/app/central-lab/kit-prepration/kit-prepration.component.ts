import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormsModule, FormArray, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-kit-prepration',
  templateUrl: './kit-prepration.component.html',
  styleUrls: ['./kit-prepration.component.css']
})
export class KitPreprationComponent implements OnInit {

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
  constructor(private protocolService: ProtocolService, private adminService: AdminService, private croService: CrosService, private formBuilder: FormBuilder) { };
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
  kitIdv: any =''
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

      screenKitList: this.formBuilder.array([])
    });
  
 

    this.VisitKitForm = this.formBuilder.group({

      visitKitList: this.formBuilder.array([])

    })

    this.listItems = [];
   
  }
  printLabel(i:any, id: any){


  const kitId = this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').value;

  const ckitId = this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').value;

 
console.log(this.sMatDetails);

 
    
      const printSection = document.getElementById('printSection');
      if (printSection) {
        const printContent = printSection.innerHTML;
        const printWindow = window.open('', '', 'height=500,width=500');
        if (printWindow) {
          const printDocument = printWindow.document;
          printDocument.write(`
            <html>
            <head>
              <title>Print</title>
              <style>
                /* Custom styling for the print output */
                /* Add any necessary styles for your specific requirements */
              </style>
            </head>
            <h1>Print Content</h1>
            <p>KitId: ${kitId}</p>
            <p>LabKitId: ${ckitId}</p>
            <p>ProtocolId: ${this.protocolIdDetails.protocol_id}</p>
            <p>ProtocolName: ${this.protocolIdDetails.protocol_name}</p>
            <p>Type: Screening</p>
            <p>Material:</p>
            <div class="col-md-3 mb-3">
            ${this.sMatDetails
              .map(
                (item) => `
                <p>Material:</p>
                  <p>Material ID: ${item.meterial_id}</p>
                  <p>Size: ${item.size}</p>
                  <p>Quantity: ${item.quantity}</p>
                `
              )
              .join('')}
          </div>
              <script>
                setTimeout(() => {
                  window.print();
                  window.onafterprint = function () {
                    window.close();
                  };
                }, 100);
              </script>
            </body>
            </html>
          `);
        }
      }
    
  }
 
  getprotocolDetails(id: any) {
this.scount =''
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
  
      this.visitRecords.forEach((visitRecordrow: any) => {
        this.visitRecordsRow.push(visitRecordrow);
      });
     
   
     
    });

     
  } 
//   for (let i = 1; i <= this.scount ; i++)
//   { 
//     this.adjustScreenKitRows(this.scount);
//  } 
//  for (let i = 1; i <= this.vMatDetails.length; i++) {
//   console.log('k');
  

//   this.addCard();


  adjustvisitKitRows(count: number) {
 
    const currentRowCount = this.getRows(0).length; // Assuming you're working with the first card
  console.log(currentRowCount);
  
    if (count > currentRowCount) {
      const rowsToAdd = count - currentRowCount;
      for (let i = 0; i < rowsToAdd; i++) {
        this.getRows(0).push(this.createRow()); // Assuming you're working with the first card and createRow() creates a new row FormGroup
      }
    } else if (count < currentRowCount) {
      const rowsToRemove = currentRowCount - count;
      for (let i = 0; i < rowsToRemove; i++) {
        this.getRows(0).removeAt(this.getRows(0).length - 1); // Assuming you're working with the first card
      }
    }
  }
  
 
  
  
  
  
  
  
  
  adjustVisit(count: number) {
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

 
  addScreenKit(record:any) {
    this.ScreenKitForm.get('screenKitList').push(this.addScreenKitData(record));
    console.log(this.ScreenKitForm.controls);

    // const screenKitListFormArray = this.ScreenKitForm.get('screenKitList') as FormArray;
    // screenKitListFormArray.push(this.addScreenKitData(record))
  }

 
  onScreenKitAdd(rec:any) {

    
    const control1 = this.ScreenKitForm.get('screenKitList') as FormArray;
    control1.push(this.addScreenKitData(rec));
    

  }

  addScreenKitData(record: string) {

    return this.formBuilder.group({
      ckitId: [{ value: this.protocolIdDetails.protocol_id+'sk', disabled: true }],
      kitId: [''],
      prepration: [''],

    })
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
    const formData = [];
 
    // Iterate over the cards and access their form values
    for (const card of this.cards) {
      const formValues = card.form.value;
      formData.push(formValues);
    }
     console.log(formData);
    
  
    const data = {
      "protocol_id": this.protocolIdDetails.protocol_id,
      "screening_kit_details": [
        {
        
         
          "meterial_details": this.ScreenKitForm.value.screenKitList
            
      
        }
      ],
      "visit_kit_details": [
        {
         
         
          "meterial_details":  formData
        }
      ]
  
    }
 
   
    console.log(data);

    this.protocolService.postProtocol(data).subscribe(
      (data:any) => {
        alert('protocol created successfully');
      },
      (err:any)=>{
        alert(err.errorr.message)
      }
      );
  
}
 

  cards: { form: FormGroup }[] = [];
 

  // addCard() {
  //   const initialRowsCount = this.cards.length + 1; // Calculate the desired number of initial rows based on index
  //   const rowsArray = new FormArray([]);
  //   const cardForm = this.formBuilder.group({
  //     visits: rowsArray
  //   });
  //   this.cards.push({ form: cardForm });
  //   this.adjustvisitKitRows(this.vcount)
    
  // }



  // addCard() {
  //   alert('k')
  //   const initialRowsCount = this.cards.length + 1; // Calculate the desired number of initial rows based on index
  //   const rowsArray = new FormArray([]);
  //   const cardForm = this.formBuilder.group({
  //     rows: rowsArray
  //   });
  //   this.cards.push({ form: cardForm });

  // }

  addCard() {
    const cardForm = this.formBuilder.group({
      visits: this.formBuilder.array([]) // Initialize the visits form array
    });
  
    this.cards.push({ form: cardForm });
  
    const cardIndex = this.cards.length - 1;
    const visits = this.getRowsFormArray(cardIndex); // Get the visits form array of the newly added card
  
    for (let i = 0; i < this.vcount; i++) {
      visits.push(this.createRow()); // Add a new row to the visits form array
    }
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
    return cardForm.get('visits') as FormArray;
  }
  getRows(cardIndex: number): FormArray {
    const card = this.cards[cardIndex];
    return card.form.get('visits') as FormArray;
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





 





