
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { ProtocolService } from '../protocol-registration/protocol-registration.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-protocol-view',
  templateUrl: './protocol-view.component.html',
  styleUrls: ['./protocol-view.component.css']
})
export class ProtocolViewComponent implements OnInit {
  getCurrentYear(): number {
    return new Date().getFullYear();
  }

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
  sponsor: boolean = false;
  screeningFullData: any;
  screeningVariant: any;
  constructor(private route: Router,
    private protocolService: ProtocolService,
    private _activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder) { };
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
  public isEdit: boolean = false;
  public id: any = '';
  ngOnInit() {
    
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        this.getprotocolDetails(this.id)
        if (data.type === 'sponsor') {
          this.sponsor = true;
        }
        else {
          this.sponsor = false;
        }
      }
    });


  }

  getprotocolDetails(id: any) {

    this.protocolService.getProtocolId(this.id).subscribe((protocols) => {
      console.log(protocols);
      this.displayValues = true;
      this.protocolIdDetails = protocols.protocol
      this.protoName = this.protocolIdDetails.protocol_name
      this.preparationForm.controls['protocol_name'].disable()
      this.preparationForm.controls['protocol_name'].setValue(this.protoName)
      if (protocols.visit_kit_details[0].meterial_details.length > 0) {
        this.screeningFullData = protocols.visit_kit_details[0].meterial_details[0]
        this.screenDetails = this.screeningFullData.selectedLabTests
        this.sMatDetails = this.screeningFullData.visits;
        this.vMatDetails = protocols.visit_kit_details[0].meterial_details.slice(1);
        this.screeningVariant = protocols.visit_kit_details[0].meterial_details[0].kit_variant
      } else {
      }

      this.vcount = protocols.visit_kit_details[0].visit_kit_count
      this.scount = protocols.screening_kit_details[0].screening_kit_count
      console.log(this.vcount, 'details');
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


    });


  }





}