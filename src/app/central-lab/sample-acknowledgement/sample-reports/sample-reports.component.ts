import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';
// import { saveAs } from 'file-saver';
// import * as pdfMake from 'pdfmake/build/pdfmake';
// import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// (pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-sample-reports',
  templateUrl: './sample-reports.component.html',
  styleUrls: ['./sample-reports.component.css']
})
export class SampleReportsComponent implements OnInit {
  uploadedFiles: Array<File | null> = [];
  fileURLs: Array<string | null> = [];
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
  pdfValues: Array<any> = [];
  pdfValuesv: Array<any> = [];



  constructor(private protocolService: ProtocolService, private adminService: AdminService, private croService: CrosService, private formBuilder: FormBuilder) {
    sessionStorage.getItem('email')


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
  statusData = ['Pending ', 'Recieved']
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
    this.croService.getSites().subscribe((sites) => {

      this.sponsersData(sites);

    });
    this.protocolService.getPreparation().subscribe((protocols) => {
      console.log(protocols);

      this.ProtoData(protocols);
    });



    this.ScreenKitForm = this.formBuilder.group({

      screenKitList: this.formBuilder.array([])
    });



  }
  // download(){
  //   const svalue= "JVBERi0xLjQKJdPr6eEKMSAwIG9iago8PC9UaXRsZSAoZGV0Y"

   
  //     const len = download.fileName.lastIndexOf('.');
  //     const extension = download.fileName.substring(len + 1);
  //     if (extension === 'txt') {
  //       const linkSource = 'data:text/plain;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     } else if (extension === 'doc') {
  //       const linkSource = 'data:application/msword;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     } else if (extension === 'pdf') {
  //       const linkSource = 'data:application/pdf;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     } else if (extension === 'docx') {
  //       const linkSource = 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     } else if (extension === 'odt') {
  //       const linkSource = 'data:application/vnd.oasis.opendocument.text;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     }
  //     else if (extension === 'jpeg' || extension === 'jpg' || extension === 'JPG' || extension === 'png') {
  //       const linkSource = 'data:image/jpeg;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     }
  //     else if (extension === 'png') {
  //       const linkSource = 'data:image/png;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     }
  //     else if (extension === 'xlsx') {
  //       const linkSource = 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     }
  //     else if (extension === 'xls') {
  //       const linkSource = 'data:application/vnd.ms-excel;base64,' + download.base64Content;
  //       const downloadLink = document.createElement('a');
  //       const fileName = download.fileName;
  //       downloadLink.href = linkSource;
  //       downloadLink.download = fileName;
  //       downloadLink.click();
  //     }
  //   }
  
  
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
      acknowledgement: ['Pending'],
      remarks: [''],



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
      acknowledgement: ['Pending'],
      remarks: [''],

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

    });

    console.log(this.sponsers)

  }

  SubmitData() {
  

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
      
          protocol.acknowledgement = this.vMatDetails[i].visitsList.value[index].acknowledgement
          protocol.remarks = this.vMatDetails[i].visitsList.value[index].remarks
   
        
        }

      })

    }

    this.skDetails.forEach((protocol: any, index: any) => {

      protocol.acknowledgement = this.ScreenKitForm.value.screenKitList[index].acknowledgement
      protocol.remarks = this.ScreenKitForm.value.screenKitList[index].remarks
      // protocol.pdf =  this.pdfValues[index].pdf

    })
    // for(let i = 0; i<this.skDetails.length; i++ ) {
    // for(let j=0 ; j<i; j++){
      // console.log(this.pdfValues[i], this.pdfValues);
      // this.pdfValues.forEach((k:any, index: any)=>{
      //   if(index != k[index].row){
    
        
      //     this.pdfValues.push({ row: index, pdf: 'No PDF Uploaded' });
  
      //   // }
  
      // }
      // })
    

    // }
    // this.skDetails.push(this.pdfValues)
    const data = {
      "protocol_id": this.uuid,
      "protocol_name": this.protoName,
      "screening_pdf_details": [
        this.pdfValues
      ],
      "visit_pdf_details": [
        this.pdfValuesv
      ],

      "screening_kit_details": [
        this.skDetails,

      ],
      "visit_kit_details": [
        this.vkDetails,

      ]
    }

    console.log(data);


    // const data = {
    //   "protocol_id": this.uuid,
    //   "screening_kit_details": this.skDetails,
    //   "visit_kit_details": this.vkDetails


    // }


    console.log(data);

    this.protocolService.updatePreparationById(data).subscribe(
      (data: any) => {
        alert('Sample Acknowledgement Updated successfully');
      },
      (err: any) => {
        alert(err.errorr.message)
      }
    );

  }
  fileSelected(fileInput: any, rowIndex: number): void {
    const file = fileInput.files[0];
    this.uploadedFiles[rowIndex] = file;
    this.getFileUrl(file, rowIndex);
  }

  getFileUrl(file: File, rowIndex: number): void {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileURL = e.target?.result as string;
      this.fileURLs[rowIndex] = fileURL;
    };
    reader.readAsDataURL(file);


  }

  uploadFile(evt: any, rowIndex: any) {
    let uploadedFiles = [];
    this.files1 = evt.target.files;
    uploadedFiles[rowIndex] = this.files1 ? 'File Uploaded' : '';

    // Update the corresponding span element with the file status
    const statusElement = document.getElementById(`status_${rowIndex}`);
    if (statusElement) {
      statusElement.textContent = uploadedFiles[rowIndex];
    }

  
    const file = this.files1[0];
    this.file2 = this.files1[0].name;
    const fileSize = this.files1[0].size;
    if (fileSize >= 1084) {
    }
    if (this.files1 && file) {


      const reader = new FileReader();
   
      reader.onload = this._handleReaderLoaded1.bind(this, rowIndex);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded1(readerEvt: any, id: any) {

    const binaryString = id.target.result;
    this.base64textString = btoa(binaryString);
    this.bas2 = 'data:text/html;base64,' + this.base64textString;
    this.bas2 = this.bas2.substring(this.bas2.indexOf(',') + 1);
 
    // this.pdfValues.push(({row:readerEvt, pdf:this.bas2}))

    const existingPdf = this.pdfValues.find((pdfValue: any) => pdfValue.row === readerEvt);


    if (existingPdf) {
      // PDF already exists for the row, remove it
      const pdfIndex = this.pdfValues.indexOf(existingPdf);
      this.pdfValues.splice(pdfIndex, 1);
    }

    this.pdfValues.push({ row: readerEvt, pdf: this.bas2 });
  
  }






  uploadFilev(evt: any, tabindex: any, rowIndex: any) {


    this.files1 = evt.target.files;


    const file = this.files1[0];
    this.file2 = this.files1[0].name;
    const fileSize = this.files1[0].size;
    if (fileSize >= 1084) {
    }
    if (this.files1 && file) {


      const reader = new FileReader();
   
      reader.onload = this._handleReaderLoadedv.bind(this, tabindex, rowIndex);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoadedv(readerEvt: any, rowindex: any, id: any) {
  


    const binaryString = id.target.result;
    this.base64textString = btoa(binaryString);
    this.bas2 = 'data:text/html;base64,' + this.base64textString;
    this.bas2 = this.bas2.substring(this.bas2.indexOf(',') + 1);
 
 

    const existingPdf = this.pdfValuesv.find((pdfValue: any) => pdfValue.visit === readerEvt);
 

    if (existingPdf ) {
      if(this.pdfValuesv.find((pdfValue: any) => pdfValue.row === rowindex)){
      // PDF already exists for the row, remove it
      const pdfIndex = this.pdfValuesv.indexOf(existingPdf);
      this.pdfValuesv.splice(pdfIndex, 1);
    }
  }

  this.pdfValuesv.push(({ visit: readerEvt, row: rowindex, pdf: this.bas2 }))


  }
  // downloadStringAsPDF() {
  //   const stringToDownload = 'This is the string to be downloaded as a PDF';

  //   const docDefinition = {
  //     content: [
  //       { text: stringToDownload, fontSize: 12 }
  //     ]
  //   };

  //   const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  //   pdfDocGenerator.getBlob((blob: Blob) => {
  //     saveAs(blob, 'downloaded-file.pdf');
  //   });
  // }

}
















