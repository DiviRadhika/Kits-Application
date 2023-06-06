import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { CrosService } from 'src/app/cro/cros.service';
import { ProtocolService } from 'src/app/cro/protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-kit-verification',
  templateUrl: './kit-verification.component.html',
  styleUrls: ['./kit-verification.component.css']
})
export class KitVerificationComponent implements OnInit {
  labelid: string='';
  kitId = 3;
  screenid = 4;
  constructor(private protocolService: ProtocolService,private adminService:AdminService, private croService:CrosService, private formBuilder: FormBuilder) { };
  protocols: Array<any> = [];
  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];

  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  statusData =['Verified', 'Not Verified']

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
    //console.log('Insite Protol Registration');
    this.croService.getLabTests().subscribe((labTestsList) => {
      this.labTestsData(labTestsList);
    });

    this.adminService.getCro().subscribe((crosList) => {
      this.crosData(crosList);
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

  addScreenKitData() {
    
    return this.formBuilder.group({
     ckitId:['c123'],
     kitId: ['5678'],
     prepration:['Completed'],
     status:[''],
     labelId: ['c1lab'],
   
    })
  }

  onVisitKitAdd() {

    //this.VisitKitForm.get('labTestsList').controls.push(this.addVisitKitData());
    const control1 = this.VisitKitForm.get('visitKitList') as FormArray;
    control1.push(this.addVisitKitData());
    console.log(this.VisitKitForm.get('visitKitList').controls);
  }
  showsc(){
    this.screening = true;
    this.visit = false
  }
  showv(){
    // this.addVisitKit()
    this.screening = false;
    this.visit = true
   
  }
  addVisitKitData() {
    return this.formBuilder.group({
      ckitId:['c567'],
     kitId: ['122'],
     prepration:['InProgress'],
     status:[''],
     labelId: ['c2lab'],
   
    })
  }

  ProtoData(Protocols:any) {
    Protocols.forEach((protocol: any) => {
      this.protocols.push(protocol);
    });

    console.log(this.protocols);
  }

  labTestsData(labTestsList:any) {
    labTestsList.forEach((labTests:any) => {
      this.labTestsList.push(labTests);
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
  generateId(){
    this.labelid = '123445'
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


