import { Component, NgModule } from '@angular/core';
import { ProtocolService } from './protocol-registration.service';
import { Form, FormBuilder, FormControl, FormsModule, FormArray, FormGroup, UntypedFormArray, UntypedFormGroup, Validators } from '@angular/forms';
import { LSponsers } from './lsponsers';
import { LabTests } from './lab-tests';
import { CROS } from './cros';
import { Protocol } from './protocol';
import { CrosService } from '../cros.service';
import { AdminService } from 'src/app/applicationadmin/admin.service';
@Component({
  selector: 'app-protocol-registration',
  templateUrl: './protocol-registration.component.html',
  styleUrls: ['./protocol-registration.component.css']
})
export class ProtocolRegistrationComponent {
  labMatTestsList: Array<any> = [];
  screening: boolean = true;
  visit: boolean = false;
  valueVisit: any= 0;
  listItems: string[]=[];
  listTabs: string[]=[];
  tabnum: number = 0;
  matList: any;
  materialList: FormArray[] = [];
  constructor(private protocolService: ProtocolService, private adminService:AdminService, private croService:CrosService, private formBuilder: FormBuilder) { };
  sponsers: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];

  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  sizeValues =['1.5ml', '1lt', '1/2lt']
  public protocolForm: FormGroup = new FormGroup({
    selected_protocol_id: new FormControl("", [Validators.required]),
    selected_protocol_name: new FormControl("", [Validators.required]),
    selected_sponsor_id: new FormControl("", [Validators.required]),
    selected_cro_id: new FormControl("", [Validators.required]),
    selected_patients_num: new FormControl("", [Validators.required]),
    screens: new FormControl("", [Validators.required]),
    total_visits :new FormControl("", [Validators.required]),
    selected_vkit_count:new FormControl("", [Validators.required]),
    selected_skit_count:new FormControl("", [Validators.required]),
 
  })




 
  VisitKitMatForm: any;
  sitesForm:any;
  ScreenKitForm:any;
  ScreenMaterialKitForm: any;
  VisitKitForm:any;
  customerFormGroup:any;
 
  ngOnInit() {
    this.croService.getsponsors().subscribe((sponsers) => {
      this.sponsersData(sponsers);
    });

  
    this.croService.getLabTests().subscribe((labTestsList) => {
      this.labTestsData(labTestsList);
      this.matList = labTestsList
      this.labMatData(labTestsList)
    });

    this.adminService.getCro().subscribe((crosList) => {
      this.crosData(crosList);
    });
  
  
    this.customerFormGroup = this.formBuilder.group({
      sitesList: this.formBuilder.array([])
      
    });


    this.sitesForm = this.formBuilder.group({

      sites: this.formBuilder.array([this.addData()])

    })
    
    this.ScreenKitForm = this.formBuilder.group({

      labTestsList: this.formBuilder.array([this.addScreenKitData()])

    })

    this.ScreenMaterialKitForm=this.formBuilder.group({

      materialList: this.formBuilder.array([this.addScreenmKitData()])

    })
    //console.log(this.ScreenKitForm);
    this.VisitKitForm = this.formBuilder.group({

      labTestsList: this.formBuilder.array([this.addVisitKitData()])

    })
    this.VisitKitMatForm = this.formBuilder.group({

      materialList: this.formBuilder.array([this.addVisitKitMatData()])

    })

  }

  get customerAddressDTOList() {
    return <FormArray>this.customerFormGroup.controls['sitesList'];
  }
  onScreenKitAdd() {

    //this.ScreenKitForm.get('labTestsList').push(this.addScreenKitData());
    const control1 = this.ScreenKitForm.get('labTestsList') as FormArray;
    control1.push(this.addScreenKitData());
    console.log(this.ScreenKitForm.get('labTestsList').controls);
  }
  removeSite(j: number) { 
    this.sitesForm.get('sites').removeAt(j);
  }
  removeScreenKit(j: number) { 
    this.ScreenKitForm.get('labTestsList').removeAt(j);
  }
  removeMatScreenKit(j: number) { 
    this.ScreenMaterialKitForm.get('materialList').removeAt(j);
  }
  removeVisitKit(j: number) { 
    this.VisitKitForm.get('labTestsList').removeAt(j);
  }
  removeVisitMatKit(j: number) { 
    this.VisitKitMatForm.get('materialList').removeAt(j);
  }
  showsc(){
    this.screening = true;
    this.visit = false
  }

  showv(){
    // this.tabnum = tab
    // this.listTabs = []; 
    // for (let i = 0; i <= tab; i++)
    //  { this.listTabs.push(`Item ${i}`); 
    // //  this.addVisitKit()
  
    // }
    // this.addVisitKit()
    this.screening = false;
    this.visit = true
  }
  visits(value: any){
  console.log(value.data);
  
  this.valueVisit= value
  this.listItems = []; 
  for (let i = 1; i <= value.data; i++)
   { this.listItems.push(`Item ${i}`); 
  

  } 
  // this.tabs.push('M' + (this.tabs.length + 1));
  // this.tab.push(this.createGroup());
  // this.materialList.push(this.addScreenmKitData())
  materialList: this.formBuilder.array([this.addScreenmKitData()])
} 
  
  onMaterialKitAdd() {

    //this.ScreenKitForm.get('labTestsList').push(this.addScreenKitData());
    const control1 = this.ScreenMaterialKitForm.get('materialList') as FormArray;
    control1.push(this.addScreenmKitData());
    console.log(this.ScreenMaterialKitForm.get('materialList').controls);
  }
  addScreenKitData() {
    return this.formBuilder.group({
      lab_test_id: [''],
    
    })
  }
  addScreenmKitData() {
    return this.formBuilder.group({
     
      Material: [''],
      Size: [''],
      quantity: [''],
      frozen_status: [''],
      Image: ''
    })
  }
  addSite() {
    // for(let i=0; i<=this.valueVisit; i++){
    this.sitesForm.get('sites').push(this.addData());
    // }
  }

  addScreenKit() {
    this.ScreenKitForm.get('labTestsList').push(this.addScreenKitData());
    console.log(this.ScreenKitForm.controls);
  }
  // Wait for the DOM to be ready $(document).ready(() => { // Initialize the multi-select dropdown $('#multiSelectDropdown').selectpicker(); // Handle the change event when options are selected or deselected $('#multiSelectDropdown').on('changed.bs.select', (e) => { const selectedValues = $(e.target).val(); // Get an array of selected values console.log(selectedValues); // Do whatever you need with the selected values }); });
  addVisitKit(m: any) {
//   getPatterns(i) {
//     const targetArray = ((this.NodeInputForm.get('processCommands') as FormArray).at(index).get('patterns') as FormArray).at(j).get('targets') as FormArray;
//     return ((this.NodeInputForm.get('processCommands') as FormArray).controls[i].get('patterns') as FormArray).controls;
// }

// const patternArray = (this.NodeInputForm.get('processCommands') as FormArray).at(index).get('patterns') as FormArray;
    this.VisitKitForm.get('labTestsList').push(this.addVisitKitData());
    
  }
  addVisitMatKit(){
    this.VisitKitMatForm.get('materialList').push(this.addVisitKitMatData());
  }



  onAdd() {

    //this.sitesForm.get('sites').push(this.formBuilder.array([this.addData()]));

    const control1 = this.sitesForm.get('sites') as FormArray;
    control1.push(this.addData());
    console.log(this.sitesForm.get('sites').controls);

  }



  addData() {
    return this.formBuilder.group({
      site_id: [''],
      patient_count: [''],
      // no_of_visits: ['']
    })
  }

 

 
  onVisitKitAdd() {

    //this.VisitKitForm.get('labTestsList').controls.push(this.addVisitKitData());
    const control1 = this.VisitKitForm.get('labTestsList') as FormArray;
    control1.push(this.addVisitKitData());
    console.log(this.VisitKitForm.get('labTestsList').controls);
  }

  addVisitKitData() {
    return this.formBuilder.group({
      lab_id: [''],

    })
  }
  onVisitKitMatChange(evt: any,index: any){
   
    let selected_lab_id = evt.target.value;
    let selected_material ;
    let selected_size;
    let selected_image_string;
   
   // this.labTestsList.filter(lab => {
   //   lab.lab_id == selected_lab_id
   // })
   for(var item of this.labTestsList){
     
     if (item['lab_id'] == evt.target.value) 
     {
       selected_material = item['material'];
       selected_size = item['size'];
       selected_image_string = item['image'];
       
      //  this.VisitKitForm.controls.labTestsList.controls[index].controls['Material'].setValue(selected_material);
      //  this.VisitKitForm.controls.labTestsList.controls[index].controls['Size'].setValue(selected_size);
       const img = new Image();
       img.src = 'data:image/jpeg;base64,' + selected_image_string;
       console.log(img.src);
      // this.image_url = img.src;
       this.VisitKitMatForm.controls.materialList.controls[index].controls['Image'].setValue(img.src);          
         break;
         
     }
   } 

  }
  addVisitKitMatData(){
    return this.formBuilder.group({
      // no_of_visits: [''],
      // kit_type: [''],
      Material: [''],
      Size: [''],
      quantity:[''],
      frozen_status: [''],
      Image: ['']
    })
  }
  sponsersData(sponsers:any) {
    sponsers.forEach((sponser: any) => {
      this.sponsers.push(sponser);
    });

    console.log(this.sponsers);
  }

  labTestsData(labTestsList:any) {
    labTestsList.forEach((labTests:any) => {
      this.labTestsList.push(labTests);
    });
    console.log(this.labTestsList);
  }

  labMatData(labMatList:any) {
    labMatList.forEach((labTests:any) => {
      this.labMatTestsList.push(labTests);
    });
    console.log(this.labTestsList);
  }
  

  crosData(crosList:any) {
    crosList.forEach((cros:any) => {
      this.crosList.push(cros);
    });
  }

  sitesData(sites:any) {
    sites.forEach((site:any) => {
      this.sites.push(site);
    });
    console.log(this.sites);
  }

  SubmitData() {

    console.log(this.sitesForm.value);
    console.log(this.ScreenKitForm);
    console.log(this.VisitKitForm);

    const data =
    {
      // protocol_id: this.selected_protocol_id,
      // sponser_id: this.selected_sponsor_id,
      // cro_id: this.selected_cro_id,
      // no_of_sites: Number(this.selected_sites_num),
      // total_patients: Number(this.selected_patients_num),
      // site_data: this.sitesForm.value.sites,
      // screening_kit_count: Number(this.selected_skit_count),
      // screening_kit_lab_test_details: this.ScreenKitForm.value.labTestsList,
      // visit_kit_count: Number(this.selected_vkit_count),
    
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
  image_url:any;
  onScreenKitChange(evt: any,index: any){
    
     let selected_lab_id = evt.target.value;
     let selected_material ;
     let selected_size;
     let selected_image_string;
    // this.labTestsList.filter(lab => {
    //   lab.lab_id == selected_lab_id
    // })
    for(var item of this.labTestsList){
      if (item['lab_id'] == evt.target.value) 
      {
        selected_material = item['material'];
        selected_size = item['size'];
        selected_image_string = item['image'];        
        this.ScreenKitForm.controls.labTestsList.controls[index].controls['Material'].setValue(selected_material);
        this.ScreenKitForm.controls.labTestsList.controls[index].controls['Size'].setValue(selected_size);
        const img = new Image();
        console.log(selected_image_string);
        img.src = 'data:image/jpeg;base64,' + selected_image_string;
        console.log(img.src);
        this.image_url = img.src;
        this.ScreenKitForm.controls.labTestsList.controls[index].controls['Image'].setValue(img.src);
          break;
          
      }
    }

    

    
  }
  onScreenKitMatChange(evt: any,index: any){
    
    
    let selected_lab_id = evt.target.value;
    let selected_material ;
    let selected_size;
    let selected_image_string;
   
   // this.labTestsList.filter(lab => {
   //   lab.lab_id == selected_lab_id
   // })
   for(var item of this.labMatTestsList){
     
     if (item['lab_id'] == evt.target.value) 
     {
    
       selected_image_string = item['image'];
      
       const img = new Image();
       img.src = 'data:image/jpeg;base64,' + selected_image_string;
       console.log(img.src);
      // this.image_url = img.src;
       this.ScreenMaterialKitForm.controls.materialList.controls[index].controls['Image'].setValue(img.src);          
         break;
         
     }
   }    
 }

  //image_url:any;
  onVisitKitChange(evt: any,index: any){
    
    
     let selected_lab_id = evt.target.value;
     let selected_material ;
     let selected_size;
     let selected_image_string;
    
    // this.labTestsList.filter(lab => {
    //   lab.lab_id == selected_lab_id
    // })
    for(var item of this.labTestsList){
      
      if (item['lab_id'] == evt.target.value) 
      {
        selected_material = item['material'];
        selected_size = item['size'];
        selected_image_string = item['image'];
        
        this.VisitKitForm.controls.labTestsList.controls[index].controls['Material'].setValue(selected_material);
        this.VisitKitForm.controls.labTestsList.controls[index].controls['Size'].setValue(selected_size);
        const img = new Image();
        img.src = 'data:image/jpeg;base64,' + selected_image_string;
        console.log(img.src);
       // this.image_url = img.src;
        this.VisitKitForm.controls.labTestsList.controls[index].controls['Image'].setValue(img.src);          
          break;
          
      }
    }    
  }

}


