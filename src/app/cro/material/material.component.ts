import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { ProtocolService } from '../protocol-registration/protocol-registration.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  stackedData2: any
  subjectDetails: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  date1: any
  enableFields: boolean = false;
  crasiteenable: boolean = false;
  disablefields: boolean = false;
  disappearfields: boolean = false;
  appearfields: boolean = false;
  sponserfields: boolean = false;

  dashboardform: any;
  myForm: any;
  tabs: any[] = []; // Array to hold tabs
  // activeTab: number = ''; // Active tab index
  count = 2;
  cards: any[] = [];
  craform: any;
  sponserForm: any;
  dataSponsor: any;


  chartOptions: any;
  sponsors: any

  role: any;
  adminRole: boolean = false;
  sponsorRole: boolean = false;
  croRole: boolean = false;
  centralLab: boolean = false;
  siteRole: boolean = false;
  dataCentralLabs: any;
  dataCro: any;
  dataCra: any
  stackedData: any;

  stackedOptions: any;
  dashboardsData: any;
  crocenable: boolean = false;
  cracenable: boolean = false;
  sponsorcenable: boolean = false;
  labcenable: boolean = false;
  adminc: boolean = false;
  basicData: any;
  basicData2: any;
  basicOptions: any;
  constructor(private fb: FormBuilder, private admin: AdminService, private protocol:ProtocolService) { }

  ngOnInit() {
    this.getsubjectDetails()
    this.basicData = {
      labels: ['P001', 'P002', 'P003', 'P004', 'P005'],
      datasets: [
        {
          label: 'Received',
          backgroundColor: '#42A5F5',
          data: [20, 12, 13, 21, 4]
        },

      ]
    };
  
    this.admin.dashboard().subscribe((data: any) => {
      this.dashboardsData = data
      console.log(this.dashboardsData);
      this.dataCra = {



        labels: ['No.of Screened', 'Not Screened'
        ],
        datasets: [
          {

            data: [10, 22],
            backgroundColor: [
              "#D98880 ",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE ",
              '#D0ECE7'
            ],
            hoverBackgroundColor: [
              "#D98880 ",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE ",
              '#D0ECE7'
            ]
          }
        ]

      };


      this.dataCro = {
        labels: ['Protocols',
          'Sites',
          'Sponsors',
          'LabTests',
          'Materials'
        ],
        datasets: [
          {
            data: [this.dashboardsData.no_of_protocols, this.dashboardsData.no_of_sites, this.dashboardsData.no_of_sponsors, this.dashboardsData.no_of_lab_tests,
            this.dashboardsData.no_of_materials],

            backgroundColor: [
              "#D98880 ",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE ",
            ],
            hoverBackgroundColor: [
              "#D98880 ",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE ",
            ]
          }
        ]
      };
      this.dataCentralLabs = {
        labels: ['No.of Protocols',
          'No.of Kits',
          'No.of Patients',
          'Prepared Kits',
          'In Progress Kits',
          'Verified Kits',
          'Not Verified Kits',
          'Pending Samples',
          'Recieved Samples'],
        datasets: [
          {
            data: [this.dashboardsData.no_of_protocols,
            this.dashboardsData.no_of_kits,
            this.dashboardsData.no_of_patients,
            this.dashboardsData.no_of_completed_kits
              , this.dashboardsData.no_of_inprogress_kits,
            this.dashboardsData.no_of_verified_kits,
            this.dashboardsData.no_of_not_verified_kits, this.dashboardsData.no_of_pending_collections,
            this.dashboardsData.no_of_received_collections],
            backgroundColor: [
              "#D98880 ",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE ",
              '#D0ECE7',
              '#A569BD',
              '#D7BDE2',
              '#F4ECF7'
            ],
            hoverBackgroundColor: [
              "#D98880",
              '#F5B7B1',
              '#FDEBD0 ',
              "#45B39D",
              "#A2D9CE",
              '#D0ECE7',
              '#A569BD',
              '#D7BDE2',
              '#F4ECF7'
            ]
          }
        ]
      };
      this.stackedData = {
        labels: ['P0001', 'P0002', 'P0003', 'P0004', 'P0005', 'P0006', 'P0007'],
        datasets: [{
          type: 'bar',
          label: 'A',
          backgroundColor: '#42A5F5',
          data: [
            50,
            25,
            12,
            48,
            90,
            76,
            42
          ]
        }, {
          type: 'bar',
          label: 'B',
          backgroundColor: '#66BB6A',
          data: [
            21,
            84,
            24,
            75,
            37,
            65,
            34
          ]
        }, {
          type: 'bar',
          label: 'C',
          backgroundColor: '#FFA726',
          data: [
            41,
            52,
            24,
            74,
            23,
            21,
            32
          ]
        }]
      };
      this.stackedData2 = {
        labels: ['P0001'],
        datasets: [{
          type: 'bar',
          label: 'A',
          backgroundColor: '#42A5F5',
          data: [
            50,

          ]
        }, {
          type: 'bar',
          label: 'B',
          backgroundColor: '#66BB6A',
          data: [
            21,

          ]
        }]
      };

      this.stackedOptions = {
        scales: {
          x: { stacked: true },
          y: { stacked: true }
        }
      };

      this.dataSponsor = {
        labels: ['No.of Sponsors', 'No.of Protocols'],
        datasets: [
          {
            data: [this.dashboardsData.no_of_sponsors, this.dashboardsData.no_of_protocols],
            backgroundColor: [
              "#D98880 ",
              '#F5B7B1'
            ],
            hoverBackgroundColor: [
              "#D98880 ",
              '#F5B7B1'
            ]
          }
        ]
      };


    })
    this.myForm = this.fb.group({
      tabControls: this.fb.array([]) // Create an empty FormArray
    });

    this.dashboardform = this.fb.group({
      cardControls: this.fb.array([])

    })

    this.craform = this.fb.group({
      cardControls: this.fb.array([])

    })
    this.sponserForm = this.fb.group({
      cardControls: this.fb.array([])
    })





    this.role = sessionStorage.getItem('role')
    if (this.role === 'Admin' || this.role === 'admin') {
      this.enableFields = true;
      this.disablefields = true;
      this.disappearfields = true;
      this.appearfields = true;
      this.adminc = true;
      this.sponserfields = true;
      this.crasiteenable = false;


    }
    else if (this.role === 'Sponsor') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = false;
      this.appearfields = true;
      this.crocenable = false;
      this.cracenable = false;
      this.sponsorcenable = true;
      this.labcenable = false;
      this.adminc = false;
      this.sponserfields = true;
      this.crasiteenable = false;
    }
    else if (this.role === 'CRO') {
      this.enableFields = false;
      this.disablefields = true;
      this.disappearfields = false;
      this.appearfields = false;
      this.crocenable = true;
      this.cracenable = false;
      this.sponsorcenable = false;
      this.labcenable = false;
      this.adminc = false;
      this.sponserfields = false;
      this.crasiteenable = false;


    }
    else if (this.role === 'Central Lab') {
      this.enableFields = true;
      this.disablefields = false;
      this.disappearfields = false
      this.appearfields = false;
      this.crocenable = false;
      this.cracenable = false;
      this.sponsorcenable = false;
      this.labcenable = true;
      this.adminc = false;
      this.sponserfields = false;
      this.crasiteenable = false;


    }
    else if (this.role === 'CRA') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = true;
      this.appearfields = false;
      this.crocenable = false;
      this.cracenable = true;
      this.sponsorcenable = false;
      this.labcenable = false;
      this.sponserfields = false;
      this.crasiteenable = false;

    }
    else if (this.role === 'Site Coordinator') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = false;
      this.appearfields = false;
      this.crocenable = false;
      this.cracenable = false;
      this.crasiteenable = true;
      this.sponsorcenable = false;
      this.labcenable = false;
      this.sponserfields = false;
    }

  }
  dateselect(val: any) {
    console.log(val);
    console.log(val + 1);


  }
  // function bringCardToTop(cardClass:string):void{
  //   const
  // }

  getsubjectDetails() {

    // this.admin.getInventory().subscribe(
    //   (data: any) => {
    //     console.log(data)

    //     this.subjectDetails = data
    //     console.log(data)

    //   },
    //   (err: any) => {
    //     // this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
    //   }
    // )
    this.protocol.dashboardtable().subscribe(
      (data: any) => {
        console.log(data)

        this.subjectDetails = data
        // console.log(data)

      },
      (err: any) => {
        // this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
      }
    )

  }
}