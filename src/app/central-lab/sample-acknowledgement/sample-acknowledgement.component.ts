import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-sample-acknowledgement',
  templateUrl: './sample-acknowledgement.component.html',
  styleUrls: ['./sample-acknowledgement.component.css']
})
export class SampleAcknowledgementComponent implements OnInit {
  // uploadedFiles: Array<File | null> = [];
  uploadedFiles: Array<File>[] = [];
  uploadedFilesv: Array<File>[][] = [];
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
  base64String: any;
  count = 2;
  allTabsData: any[] = [];
  index: any;
  indexvalue: any;
  vmdetails: any[] = [];
  uuid: any;
  skDetails: any[] = [];
  vkDetails: any;
  value: any;
  sponsers: Array<any> = [];  pdfValuesfull: Array<any> = [];  pdfValuesfullv: Array<any> = [];
  pdfValues: Array<any> = [];
  pdfValuesv: Array<any> = [];
  date: string;
  results: any[] = [];
  display: boolean = false;
  indexs: number = 0;
  displayv: boolean = false;
  tabi: number= 0;
  indexv: number = 0;
  constructor(private protocolService: ProtocolService, private messageService: MessageService, private croService: CrosService, private formBuilder: FormBuilder) {
    sessionStorage.getItem('email')
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Note: Month starts from 0, so add 1 to get the actual month
    const day = currentDate.getDate();

    this.date = `${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year}`;

    // Print the current date



  };
  resultsfull: any[] = [];
  resultsfullv: any[][] = [];
  resultsv: any[][] = [];
  resultsvfull: any[][] = [];
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
    specialInstructions: new FormControl("", [Validators.required]),
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
  disableScroll() {
    document.body.style.overflow = 'hidden';
  }
  dialog() {
    this.display = true
    
  }
  uploadv(){
    this.displayv = false 
  }
  upload(){
    this.display = false
  }
  enableScroll() {
    document.body.style.overflow = 'auto';
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
      this.preparationForm.controls['specialInstructions'].disable()
      this.preparationForm.controls['specialInstructions'].setValue(this.protocolIdDetails.special_instructions)
     
      this.screenDetails = protocols.screening_kit_details[0].lab_test_ids
      this.sMatDetails = protocols.screening_kit_details[0].meterial_details
      this.visitDetails = protocols.visit_kit_details[0].lab_test_ids
      this.vMatDetails = protocols.visit_kit_details[0].meterial_details
      this.scount = protocols.screening_kit_details[0].screening_kit_count
      this.vcount = protocols.visit_kit_details[0].visit_kit_count
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
  openUploadDialog(rowIndex: number): void {
 
    this.display = true;
   this.indexs = rowIndex
}

openUploadDialogv(tabIndex:number, rowIndex: number): void {
  
     this.displayv = true;
    this.tabi = tabIndex;
    this.indexv = rowIndex
 }
  getformGroup(i: any) {
    return this.vMatDetails.at(i).visitKitFormGroup as FormGroup

  }

  enable(){
    this.display= true
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
   
    const data = {
      "protocol_id": this.uuid,
      "protocol_name": this.protoName,
      "screening_pdf_details": [
        this.pdfValues,
        // this.pdfValuesfull
      ],
      "visit_pdf_details": [
        this.pdfValuesv,
        // this.pdfValuesfullv
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


    // console.log(data);

    this.protocolService.updatePreparationById(data).subscribe(
      (data: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Sample Acknowledgement Updated successfully' });
      },
      (err: any) => {

        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.errorr.message });

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
  uploadFileFull(evt: any, rowIndex: any) {
    let uploadedFilesfull = [];
    this.files1 = evt.target.files;
    uploadedFilesfull[rowIndex] = this.files1 ? 'File Uploaded' : '';

    // Update the corresponding span element with the file status
    const statusElement = document.getElementById(`status_${rowIndex}`);
    if (statusElement) {
      statusElement.textContent = uploadedFilesfull[rowIndex];
    }


    const file = this.files1[0];
    this.file2 = this.files1[0].name;
    const fileSize = this.files1[0].size;
    if (fileSize >= 1084) {
    }
    if (this.files1 && file) {


      const reader = new FileReader();

      reader.onload = this._handleReaderLoadedfull.bind(this, rowIndex);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoadedfull(readerEvt: any, id: any) {

    const binaryString = id.target.result;
    this.base64textString = btoa(binaryString);
    this.bas2 = 'data:text/html;base64,' + this.base64textString;
    this.bas2 = this.bas2.substring(this.bas2.indexOf(',') + 1);

    const existingPdf = this.pdfValuesfull.find((pdfValue: any) => pdfValue.row === readerEvt);
    this.resultsfull[readerEvt] = this.bas2;

    if (existingPdf) {
      // PDF already exists for the row, remove it
      const pdfIndex = this.pdfValuesfull.indexOf(existingPdf);
      this.pdfValuesfull.splice(pdfIndex, 1);
    }

    ;

  }
  // uploadFile(evt: any, rowIndex: any) {
  //   const files: FileList = evt.target.files;
  //   if (files && files.length > 0) {
  //     if (!this.uploadedFiles[rowIndex]) {
  //       this.uploadedFiles[rowIndex] = []; // Initialize if not exists
  //     }
  
  //     for (let i = 0; i < files.length; i++) {
  //       this.uploadedFiles[rowIndex].push(files[i]); // Store the uploaded file
  //     }
  //   }
   
  // }
  

  
  
  
  uploadFile(evt: any, rowIndex: any) {
    let uploadedFiles = [];
    this.files1 = evt.target.files;
    uploadedFiles[rowIndex] = this.files1 ? 'File Uploaded' : '';

    // Update the corresponding span element with the file status
    // const statusElement = document.getElementById(`status_${rowIndex}`);
    // if (statusElement) {
    //   statusElement.textContent = uploadedFiles[rowIndex];
    // }
    const files: FileList = evt.target.files;
    if (files && files.length > 0) {
      if (!this.uploadedFiles[rowIndex]) {
        this.uploadedFiles[rowIndex] = []; // Initialize if not exists
      }
  
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles[rowIndex].push(files[i]); // Store the uploaded file
      }
    }
console.log(  this.uploadedFiles)
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
    this.results[readerEvt] = this.bas2;

    if (existingPdf) {
      // PDF already exists for the row, remove it
      const pdfIndex = this.pdfValues.indexOf(existingPdf);
      this.pdfValues.splice(pdfIndex, 1);
    }

    this.pdfValues.push({ row: readerEvt, pdf: this.uploadedFiles });
    console.log(this.pdfValues)

  }
  files: File[] = [];
  onFileSelect(event: any) {
    const selectedFiles = event.target.files;

    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.push(selectedFiles[i]);
    }
  }

  uploadFiles() {
    const apiUrl = 'YOUR_API_ENDPOINT_HERE'; // Replace with your API endpoint
    const formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      formData.append('files', this.files[i]);
    }
  }
  _uploadFile(evt: any, rowIndex: any) {
    const files: FileList = evt.target.files;
  
    if (files && files.length > 0) {
      if (!this.uploadedFiles[rowIndex]) {
        this.uploadedFiles[rowIndex] = [];
      }
  
      const pdfList = this.pdfValues.find(item => item.row === rowIndex);
  
      if (!pdfList) {
        // Create a list for the row if it doesn't exist
        this.pdfValues.push({ row: rowIndex, pdf: [] });
      }
  
      for (let i = 0; i < files.length; i++) {
        this.uploadedFiles[rowIndex].push(files[i]);
  
        const reader = new FileReader();
        reader.onload = (readerEvt: any) => {
          const binaryString = readerEvt.target.result;
          const base64 = btoa(binaryString);
          const pdfName = files[i].name;
          // Find the pdfList for the current row
          const pdfList = this.pdfValues.find(item => item.row === rowIndex);
  
          if (pdfList) {
            // Push the base64-encoded PDF into the pdfList for the current row
            pdfList.pdf.push({ content: base64, name: pdfName });
            // pdfList.pdf.push(base64);
            console.log(this.pdfValues);
          }
        };
        reader.readAsBinaryString(files[i]);
      }
    }
  }

  uploadFilev(evt: any, tabindex: any, rowIndex: any) {
    const files: FileList = evt.target.files;
  
    if (files && files.length > 0) {
      if (!this.uploadedFilesv[tabindex]) {
        this.uploadedFilesv[tabindex] = [];
      }
  
      if (!this.uploadedFilesv[tabindex][rowIndex]) {
        this.uploadedFilesv[tabindex][rowIndex] = [];
      }
  
      const pdfList = this.pdfValuesv.find(item => item.visit === tabindex && item.row === rowIndex);
  
      if (!pdfList) {
        // Create a pdfList for the tab and row if it doesn't exist
        this.pdfValuesv.push({ visit: tabindex, row: rowIndex, pdf: [] });
      }
  
      for (let i = 0; i < files.length; i++) {
        this.uploadedFilesv[tabindex][rowIndex].push(files[i]);
  
        const reader = new FileReader();
        reader.onload = (readerEvt: any) => {
          const binaryString = readerEvt.target.result;
          const base64 = btoa(binaryString);
          const pdfName = files[i].name;
          const pdfList = this.pdfValuesv.find(item => item.visit === tabindex && item.row === rowIndex);
  
          if (pdfList) {
            // Push the base64-encoded PDF into the pdfList for the tab and row
            // pdfList.pdf.push(base64);
            pdfList.pdf.push({ content: base64, name: pdfName });
            console.log(this.pdfValuesv);
          }
        };
        reader.readAsBinaryString(files[i]);
      }
    }
  }

  // _uploadFile(evt: any, rowIndex: any) {
  //   const files: FileList = evt.target.files;
  //   if (files && files.length > 0) {
  //     if (!this.uploadedFiles[rowIndex]) {
  //       this.uploadedFiles[rowIndex] = [];
  //     }

  //     for (let i = 0; i < files.length; i++) {
  //       this.uploadedFiles[rowIndex].push(files[i]);

  //       // const formData = new FormData();

  //       // for (let i = 0; i < this.uploadedFiles[rowIndex].length; i++) {
  //       //   formData.append('files', this.uploadedFiles[rowIndex][i]);
  //       // }
  //       // console.log(formData)

  //       // this.pdfValues.push({ row: rowIndex, pdf: formData });
  //       // console.log(this.pdfValues);

  //       const reader = new FileReader();
  //       reader.onload = (readerEvt: any) => {
  //         const binaryString = readerEvt.target.result;
  //         const base64 = btoa(binaryString);
  //         this.pdfValues.push({ row: rowIndex, pdf: base64 });
  //         console.log(this.pdfValues);
          
  //       };
  //       reader.readAsBinaryString(files[i]);
  //     }
  //   }
  // }
  deleteFile(rowIndex: number, fileIndex: number) {
    this.uploadedFiles[rowIndex].splice(fileIndex, 1);
   
}
deleteFilev(tabIndex:number,rowIndex: number, fileIndex: number) {
  this.uploadedFiles[rowIndex].splice(fileIndex, 1);
 
}
  viewPdf(rowIndex: number, fileIndex: number) {
    const fileToView = this.uploadedFiles[rowIndex][fileIndex];
    const url = URL.createObjectURL(fileToView);
  
    // Open the PDF in a new window
    window.open(url, '_blank');
  }
  




  uploadFilevfull(evt: any, tabindex: any, rowIndex: any) {


    this.files1 = evt.target.files;


    const file = this.files1[0];
    this.file2 = this.files1[0].name;
    const fileSize = this.files1[0].size;
    if (fileSize >= 1084) {
    }
    if (this.files1 && file) {


      const reader = new FileReader();

      reader.onload = this._handleReaderLoadedvfull.bind(this, tabindex, rowIndex);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoadedvfull(readerEvt: any, rowindex: any, id: any) {



    const binaryString = id.target.result;
    this.base64textString = btoa(binaryString);
    this.bas2 = 'data:text/html;base64,' + this.base64textString;
    this.bas2 = this.bas2.substring(this.bas2.indexOf(',') + 1);

    // const uploadedResult = 'Result for tab ' + readerEvt + ', row ' + rowindex;

    const uploadedResult = 'Result for tab ' + readerEvt + ', row ' + rowindex;

  // Ensure the results array has the necessary dimensions
  if (!this.resultsvfull[readerEvt]) {
    this.resultsvfull[readerEvt] = [];
  }

  // Store the uploaded result in the resultsv array
  // this.resultsv[readerEvt][rowindex] = uploadedResult;
  this.resultsvfull[readerEvt][rowindex]  = this.bas2;



    const existingPdf = this.pdfValuesfullv.find((pdfValue: any) => pdfValue.visit === readerEvt);


    if (existingPdf) {
      if (this.pdfValuesfullv.find((pdfValue: any) => pdfValue.row === rowindex)) {
        // PDF already exists for the row, remove it
        const pdfIndex = this.pdfValuesfullv.indexOf(existingPdf);
        this.pdfValuesfullv.splice(pdfIndex, 1);
      }
    }

    this.pdfValuesfullv.push(({ visit: readerEvt, row: rowindex, pdf: this.bas2 }))


  }
  viewFilev(tabindex: number, rowIndex: number, fileIndex: number) {
    const fileToView = this.uploadedFilesv[tabindex][rowIndex][fileIndex];
    const url = URL.createObjectURL(fileToView);
  
    // Open the PDF in a new window
    window.open(url, '_blank');
  }

  removeFile(tabindex: number, rowIndex: number, fileIndex: number) {
    if (this.uploadedFilesv[tabindex]?.[rowIndex]) {
      this.uploadedFilesv[tabindex][rowIndex].splice(fileIndex, 1);
    }
  }

  
  

  


  _handleReaderLoadedv(readerEvt: any, rowindex: any, id: any) {



    const binaryString = id.target.result;
    this.base64textString = btoa(binaryString);
    this.bas2 = 'data:text/html;base64,' + this.base64textString;
    this.bas2 = this.bas2.substring(this.bas2.indexOf(',') + 1);

    // const uploadedResult = 'Result for tab ' + readerEvt + ', row ' + rowindex;

    const uploadedResult = 'Result for tab ' + readerEvt + ', row ' + rowindex;

  // Ensure the results array has the necessary dimensions
  if (!this.resultsv[readerEvt]) {
    this.resultsv[readerEvt] = [];
  }

  // Store the uploaded result in the resultsv array
  // this.resultsv[readerEvt][rowindex] = uploadedResult;
  this.resultsv[readerEvt][rowindex]  = this.bas2;



    const existingPdf = this.pdfValuesv.find((pdfValue: any) => pdfValue.visit === readerEvt);


    if (existingPdf) {
      if (this.pdfValuesv.find((pdfValue: any) => pdfValue.row === rowindex)) {
        // PDF already exists for the row, remove it
        const pdfIndex = this.pdfValuesv.indexOf(existingPdf);
        this.pdfValuesv.splice(pdfIndex, 1);
      }
    }

    this.pdfValuesv.push(({ visit: readerEvt, row: rowindex, pdf: this.bas2 }))


  }

  Download(id: any) {

    this.base64String = id
    if(this.base64String == ''){
      this.base64String  = 'NOt Uploaded Any PDF'
    }

    // Convert the base64 string to a Uint8Array
    const binaryArray = Uint8Array.from(atob(this.base64String), c => c.charCodeAt(0));

    // Create a Blob from the binary data
    const blob = new Blob([binaryArray], { type: 'application/pdf' });
    console.log(blob)
    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);
    console.log(url)
    // Create a link element and set its attributes
    const link = document.createElement('a');
    link.href = url;
    console.log(link.href)
    link.download = 'downloaded-file.pdf';

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up by revoking the URL
    URL.revokeObjectURL(url);

  }
 


}
















