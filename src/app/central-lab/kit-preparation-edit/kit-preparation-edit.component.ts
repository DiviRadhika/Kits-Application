import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-kit-preparation-edit',
  templateUrl: './kit-preparation-edit.component.html',
  styleUrls: ['./kit-preparation-edit.component.css']
})
export class KitPreparationEditComponent implements OnInit {


  protocolIdDetails: any;
  screenDetails: Array<any> = [];
  sMatDetails: Array<any> = [];
  visitDetails: Array<any> = [];
  vMatDetails: Array<any> = [];
  scount: any;
  vcount: any;
  displayValues: boolean = false;

  visitRecords: Array<any> = [];
  visitRecordsRow: Array<any> = [];
  tets: Array<any> = [];

  tabs: any[] = []; // Array to hold tabs
  // activeTab: number = ''; // Active tab index
  count = 2;
  allTabsData: any[] = [];
  index: any;
  indexvalue: any;
  vmdetails: any[] = [];
  uuid: any;
  skDetails: any[] = [];
  vkDetails: any;
  id: any;
  // visitKitFormGroup: FormGroup


  constructor(private protocolService: ProtocolService,
   private messageService: MessageService, private formBuilder: FormBuilder, private _activatedRoute:ActivatedRoute) {
    // this.visitKitFormGroup = this.formBuilder.group({
    //   ckitId: [''],
    //   kitId: [''],
    //   prepration: [''],
    // });
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
     
        this.id = data.id;
       
        this.getprotocolDetails(this.id)
       
      }
    
    });


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
  preprationData = ['In Progress', 'Completed']
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
    specialInstructions: new FormControl("", [Validators.required]),
  });
  ngOnInit() {

    this.protocolService.getProtocol().subscribe((protocols) => {
      this.ProtoData(protocols);
    });



    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([])
    });



  }


  printLabel(i: any, id: any) {
    const kitId = this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').value;
    const ckitId = this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').value;
    const expirydate = this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').value;
   

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
              .print-container {
                display: flex;
              }
 
              .left-content {
                padding: 10px;
              }
 
              .left-content p {
                margin: 5px 0;
              }
 
              .material-table {
                margin-top: 5px;
                border-collapse: collapse;
              }
 
              .material-table td,
              .material-table th {
                border: 1px solid #ccc;
                padding: 5px;
              }
 
              .material-table th {
                background-color: #f2f2f2;
              }
              h2{
                text-align:center;
              }
              .ok{
                margin-top:30px
              }
            </style>
          </head>
          <body>
            <div class="print-container">
            <div class="left-content">
            <h2>Screening Kit</h2>
            <p><strong>Kit Id:</strong> ${kitId}</p>
            <p><strong>LabKit Id:</strong> ${ckitId}</p>
            <p><strong>Expiry Date:</strong> ${expirydate}</p>
            <p><strong>Protocol Name:</strong> ${this.protocolIdDetails.protocol_name}</p>
            <p><strong>ProtocolId:</strong> ${this.protocolIdDetails.protocol_id}</p>
           
            <p><strong>Type:</strong> Screening</p>
       
            <div class=ok>
                <h4>Material</h4>
                <table class="material-table">
                  <thead>
                    <tr>
                      <th>Material ID</th>
                      <th>Size</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${this.sMatDetails
            .map(
              (item) => `
                          <tr>
                            <td>${item.meterial_id}</td>
                            <td>${item.size}</td>
                            <td>${item.quantity}</td>
                          </tr>
                        `
            )
            .join('')}
                  </tbody>
                </table>
              </div>
              </div>

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
    this.scount = ''
    this.protocolService.getProtocolId(this.id).subscribe((protocols) => {
      // this.uuid = id.target.value;
      this.displayValues = true;
      this.protocolIdDetails = protocols.protocol

      this.protoName = this.protocolIdDetails.protocol_name
      this.protocolService.getPreparationById(this.id).subscribe((protocolsData) => {

        this.skDetails = protocolsData.data.screening_kit_details
        this.vkDetails = protocolsData.data.visit_kit_details
      this.preparationForm.controls['protocol_name'].disable()
      this.preparationForm.controls['protocol_name'].setValue(this.protoName)
      this.preparationForm.controls['specialInstructions'].disable()
      this.preparationForm.controls['specialInstructions'].setValue(this.protocolIdDetails.special_instructions)
     
      this.screenDetails = protocols.screening_kit_details[0].lab_test_ids
      this.sMatDetails = protocols.screening_kit_details[0].meterial_details
      this.visitDetails = protocols.visit_kit_details[0].lab_test_ids
      this.vMatDetails = protocols.visit_kit_details[0].meterial_details
      this.scount = protocols.screening_kit_details[0].screening_kit_count
   
     
      this.vcount = protocols.visit_kit_details[0].visit_kit_count
      this.visitRecords = []
      this.visitRecordsRow = []
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
            // visitKitListArray.at(j).get('kitId')?.patchValue(this.getLabKitId(i, j));
            const kitIdControl = visitKitListArray.at(j).get('kitId');
            if (kitIdControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j]; // Assuming vkDetails is an array of arrays
                kitIdControl.patchValue(vkDetailForRowAndTab.kitId);
               
            }
         
            const ckitIdControl = visitKitListArray.at(j).get('ckitId');
            if (ckitIdControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j]; // Assuming vkDetails is an array of arrays
                ckitIdControl.patchValue(vkDetailForRowAndTab.ckitId);
               
            }
            const expirydControl = visitKitListArray.at(j).get('expiryDate');
            if (expirydControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j]; // Assuming vkDetails is an array of arrays
                expirydControl.patchValue(vkDetailForRowAndTab.expiryDate);
            }
            const prepControl = visitKitListArray.at(j).get('prepration');
            if (prepControl) {
                const vkDetailForRowAndTab = this.vkDetails[i][j];
               
                prepControl.patchValue(vkDetailForRowAndTab.prepration);
               
            }
           
          }
          tabs.visitsList = visitKitListArray;
          this.tets.push(tabs.selectedLabTests);
        }

        this.tets.push(tabs.selectedLabTests)
      });
      this.visitRecords.forEach((visitRecordrow: any) => {
        this.visitRecordsRow.push(visitRecordrow);
      });
      for (let i = 1; i <= this.scount; i++) {
        this.adjustScreenKitRows(this.scount, this.skDetails);
      }

    });
  });


  }

  getformGroup(i: any) {
    return this.vMatDetails.at(i).visitKitFormGroup as FormGroup

  }
 

  getLabKitId(tabIndex: number, recordIndex: number): string {
    const visitIndex = tabIndex + 1;
    return `${this.protocolIdDetails.protocol_id}V${visitIndex}00${recordIndex+1}`;
   
  }
  createVisitKitGroup() {
    return this.formBuilder.group({
      ckitId: [''],
      kitId: [''],
      prepration: [''],
      expiryDate:['']

    });
  }

  printLabelm(tabIndex: number, rowIndex: number) {
    const selectedTab = this.vMatDetails[tabIndex];
    const matdetails = selectedTab.visits;
    console.log(matdetails);


    const selectedRow = selectedTab.visitsList.controls[rowIndex];


    // Access the values of the selected row
    const kitId = selectedRow.get('kitId').value;
    const ckitId = selectedRow.get('ckitId').value;
    const expirydate = selectedRow.get('expirydate').value;

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
                .print-container {
                  display: flex;
                }
   
                .left-content {
                  padding: 10px;
                }
   
                .left-content p {
                  margin: 5px 0;
                }
   
                .material-table {
                  margin-top: 5px;
                  border-collapse: collapse;
                }
   
                .material-table td,
                .material-table th {
                  border: 1px solid #ccc;
                  padding: 5px;
                }
   
                .material-table th {
                  background-color: #f2f2f2;
                }
                h2{
                  text-align:center;
                }
                .ok{
                  margin-top:30px
                }
              </style>
            </head>
            <body>
       
          </body>
          <div class="print-container">
          <div class="left-content">
          <h2>Visit Kit</h2>
          <p><strong>Kit Id:</strong> ${kitId}</p>
          <p><strong>LabKit Id:</strong> ${ckitId}</p>
          <p><strong>Expiry Date :</strong> ${expirydate}</p>
          <p><strong>Protocol Name:</strong> ${this.protocolIdDetails.protocol_name}</p>
          <p><strong>ProtocolId:</strong> ${this.protocolIdDetails.protocol_id}</p>
          <p><strong>Type:</strong> Screening</p>
          <div class=ok>
          <h4>Material</h4>
          <table class="material-table">
                  <thead>
                    <tr>
                      <th>Material ID</th>
                      <th>Size</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
            ${matdetails
            .map(
              (item: any) => `
              <tr>
              <td>${item.meterial_id}</td>
              <td>${item.size}</td>
              <td>${item.quantity}</td>
            </tr>
                `
            )
            .join('')}
            </tbody>
            </table>
            </div>
            </div>
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

 



  adjustScreenKitRows(count: number, skDetails:any) {
 
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

        // this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').patchValue(this.protocolIdDetails.protocol_id + 'SK0001'+(i+1))
        if (i < skDetails.length) {
          this.ScreenKitForm.get('screenKitList').controls[i].get('kitId').patchValue(skDetails[i].kitId)
          this.ScreenKitForm.get('screenKitList').controls[i].get('ckitId').patchValue(skDetails[i].ckitId);
          this.ScreenKitForm.get('screenKitList').controls[i].get('expiryDate').patchValue(skDetails[i].expiryDate);
          this.ScreenKitForm.get('screenKitList').controls[i].get('prepration').patchValue(skDetails[i].prepration);
        
        }
       

      }
    }

  }
  // ckitId: [{ value: this.protocolIdDetails.protocol_id+'sk', disabled: true }],

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
      ckitId: [''],
      kitId: [''],
      prepration: ['In Progress'],
      expiryDate:['']

    })
  }




  ProtoData(Protocols: any) {
    Protocols.forEach((protocol: any) => {
      this.protocols.push(protocol);

    });

   
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
     

      this.vkDetails[i].forEach((protocol: any, index: any) => {
        for (let j = 0; j < this.vMatDetails.length; j++) {
          // this.vMatDetails.forEach((data:any,index: any)=>{

          protocol.ckitId = this.vMatDetails[i].visitsList.value[index].ckitId
          protocol.prepration = this.vMatDetails[i].visitsList.value[index].prepration
          protocol.expiryDate = this.vMatDetails[i].visitsList.value[index].expiryDate
          // protocol.verification_status = false
        }

      })

    }
    this.skDetails.forEach((protocol: any, index: any) => {

      // this.vMatDetails.forEach((data:any,index: any)=>{
        // protocol.verification_status = false
      protocol.ckitId = this.ScreenKitForm.value.screenKitList[index].ckitId
      protocol.prepration = this.ScreenKitForm.value.screenKitList[index].prepration
       protocol.expiryDate = this.ScreenKitForm.value.screenKitList[index].expiryDate
    })

    const data = {
      "protocol_id": this.id,
      "screening_kit_details": this.skDetails,
      "visit_kit_details": this.vkDetails

    }

    console.log(data);

    this.protocolService.updatePreparationById(data).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail:'Kit Preparation Updated successfully' });
      },
      (err: any) => {
       
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail:err.errorr.message });
       
      }
    );

  }





}















