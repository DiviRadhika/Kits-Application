import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  enableFields: boolean = false;
  disablefields: boolean = false;
  disappearfields: boolean = false;
  appearfields: boolean = false;

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

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
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
    this.dataCra = {
      labels: ['No.of Protocols',
        'Received Samples',
       ' Pending Samples'
        ,'No.of Kits',
        'No.of Patients',
        'No.of Sites'],
      datasets: [
          {
              data: [300, 50, 100,353,244,200],
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
            data: [300, 50, 100],
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
      labels: ['No.of Kits',
        'No.of Patients',
        'Prepared Kits',
        'In Progress Kits',
        'Verified Kits',
        'Not Verified Kits',   
        'No.of Protocols',
        'Pending Samples',
        'Recieved Samples'],
      datasets: [
        {
          data: [300, 50, 20, 40, 50,59, 78, 60,80],
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

    this.dataSponsor = {
      labels: ['No.of Sponsors', 'No.of Protocols'],
      datasets: [
        {
          data: [300, 50],
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




    this.role = sessionStorage.getItem('role')
    if (this.role === 'admin') {
      this.enableFields = true;
      this.disablefields = true;
      this.disappearfields = true;
      this.appearfields = true;


    }
    else if (this.role === 'Sponsor') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = false;
      this.appearfields = true;
    }
    else if (this.role === 'CRO') {
      this.enableFields = false;
      this.disablefields = true;
      this.disappearfields = false;
      this.appearfields = false;

    }
    else if (this.role === 'Central Lab') {
      this.enableFields = true;
      this.disablefields = false;
      this.disappearfields = false
      this.appearfields = false;

    }
    else if (this.role === 'CRA') {
      this.enableFields = false;
      this.disablefields = false;
      this.disappearfields = true;
      this.appearfields = false;
    }

  }
  // function bringCardToTop(cardClass:string):void{
  //   const
  // }


}