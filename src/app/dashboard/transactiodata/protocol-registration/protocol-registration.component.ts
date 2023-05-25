// import { Component } from '@angular/core';
// import { FormControl, FormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { ProtocolService } from 'src/app/Services/CRO-PROTOCOL/protocol.service';
// import { CroService } from 'src/app/Services/CRO/cro.service';
// import { LabTestService } from 'src/app/Services/LAB-TEST/lab-test.service';
// import { SiteService } from 'src/app/Services/SITE/site.service';
// import { SposorService } from 'src/app/Services/SPONSOR/sposor.service';
// import { cro } from 'src/app/const.ts/cro';
// import { labtest } from 'src/app/const.ts/labtest';
// import { site } from 'src/app/const.ts/site';
// import { sponsor } from 'src/app/const.ts/sponsor';

// interface LabTest {
//   lab_test: string;
//   material: string;
//   size: string;
//   image: string;
// }
// interface Row {
//   siteId: string;
//   details?: LabTest;
// }

// @Component({
//   selector: 'app-protocol-registration',
//   templateUrl: './protocol-registration.component.html',
//   styleUrls: ['./protocol-registration.component.css']
// })
// export class ProtocolRegistrationComponent {
// submit() {
// throw new Error('Method not implemented.');
// }
//   public sponsors: sponsor[] = [];
//   existingRows: any[] = [];
//   labtests: LabTest[] = []; // Assuming you have initialized this array with the lab tests
//   existingRows: Row[] = [];

//   public labtests: labtest[] = [];
//   public sites: site[] = [];
//   public cros: cro[] = [];
//   selectedOption!: sponsor;
//   public KitType: any = ''
//   public isEdit: boolean = false;
//   public id: any = '';
//   addedRows: any;
//   labtest: any;
//   ProtocolForm!: FormGroup<any>;
//   updateDetails(row: Row): void {
//     const selectedTest = row.siteId;
//     const labtest = this.labtests.find((item: LabTest) => item.lab_test === selectedTest);

//     if (labtest) {
//       row.details = {
//         lab_test: labtest.lab_test,
//         material: labtest.material,
//         size: labtest.size,
//         image: labtest.image
//       };
//     } else {
//       row.details = null;
//     }
//   }

//   // Add a new row
// //   addRow(): void {
// //     const newRow: Row = {
// //       siteId: 'Select an option'
// //     };
// //     this.existingRows.push(newRow);
// //   }
// // };

//   constructor(
//     private _activatedRoute: ActivatedRoute,
//     private _protocolService: ProtocolService,
//     private _sponsorService: SposorService,
//     private _labtestService: LabTestService,
//     private _siteService: SiteService,
//     private _croService: CroService
    
//   ) {
//     this._croService.getCro().subscribe(
//       (data: cro[]) => {
//         this.cros = data;
//       },
//       (err: any) => {
//         alert('internal server error')
//       }
//     )
//     this._siteService.getSites().subscribe(
//       (data: site[]) => {
//         this.sites = data;
//       },
//       (err: any) => {
//         alert('Internal server error');
//       }
//     );
//     this._labtestService.getLabTests().subscribe(
//       (data: labtest[]) => {
//         this.labtests = data;
//       },
//       (err: any) => {
//         alert('Internal server error');
//       }
//     );

//     this._sponsorService.getsponsors().subscribe(
//       (data: sponsor[]) => {
//         this.sponsors = data;
//       },
//       (err: any) => {
//         alert('Internal server error');
//       }
//     );

//     this._activatedRoute.params.subscribe((data: any) => {
//       if (data.id) {
//         this.isEdit = true;
//         this.id = data.id;
//         _protocolService.getProtocolDetails(data.id).subscribe((data: any) => {
//           this.ProtocolForm.patchValue(data);
//         });
//       }
//     });
//   }
//   public protocolForm: FormGroup = new FormGroup({

//     protocol_id: new FormControl(),
//     sponsor_id: new FormControl(),
//     cro_id: new FormControl(),
//     no_of_sites: new FormControl(),
//     total_patients: new FormControl(),
//     site_ids: new FormControl(),


//     screening_kit_count: new FormControl(),
//     screening_kit_lab_tests: new FormControl(),
//     visit_kit_count: new FormControl(),
//     visit_kit_details: new FormControl(),

//     no_of_visits: new FormControl(),
//     kit_type: new FormControl(),
//     lab_id: new FormControl()
//   });
//   submit() {
//     if (this.isEdit) {
//       this._protocolService.updateProtocolDetails(this.ProtocolForm.value, this.id).subscribe(
//         (data: any) => {
//           alert('update successfully');
//         },
//         (err: any) => {
//           alert("internal server error")
//         }
//       );
//     }
//     else {
//       this._protocolService.CreateProtocolDetails(this.ProtocolForm.value).subscribe(
//         (data: any) => {
//           alert('cro protocol Details Created Successfully');
//         },
//         (err: any) => {
//           alert(' error')
//         }
//       )
//     }
//   }
  

// function constructor(private: any, _activatedRoute: any, ActivatedRoute: typeof ActivatedRoute, private1: any, _protocolService: any, ProtocolService: typeof ProtocolService, private2: any, _sponsorService: any, SposorService: typeof SposorService, private3: any, _labtestService: any, LabTestService: typeof LabTestService, private4: any, _siteService: any, SiteService: typeof SiteService, private5: any, _croService: any, CroService: typeof CroService) {
//   throw new Error('Function not implemented.');
// }

// function submit() {
//   throw new Error('Function not implemented.');
// }
  
//   add()
//     const newRow = {
//       siteId: '',
//       patientCount: null,
//       numberOfVisits: null,
//       LabTest: 'String',
//       Material: '',
//       size: '',
//       Frozenatsite: '',
//       image: ''

//     };


//   function constructor(private: any, _activatedRoute: any, ActivatedRoute: typeof ActivatedRoute, private1: any, _protocolService: any, ProtocolService: typeof ProtocolService, private2: any, _sponsorService: any, SposorService: typeof SposorService, private3: any, _labtestService: any, LabTestService: typeof LabTestService, private4: any, _siteService: any, SiteService: typeof SiteService, private5: any, _croService: any, CroService: typeof CroService) {
//     throw new Error('Function not implemented.');
//   }

//   function add() {
//     throw new Error('Function not implemented.');
//   }

//   function constructor(private: any, _activatedRoute: any, ActivatedRoute: typeof ActivatedRoute, private1: any, _protocolService: any, ProtocolService: typeof ProtocolService, private2: any, _sponsorService: any, SposorService: typeof SposorService, private3: any, _labtestService: any, LabTestService: typeof LabTestService, private4: any, _siteService: any, SiteService: typeof SiteService, private5: any, _croService: any, CroService: typeof CroService) {
//     throw new Error('Function not implemented.');
//   }

//   function add() {
//     throw new Error('Function not implemented.');
//   }
//     this.existingRows.push(newRow);
//   }
//   updateDetails(row: any): void {
//     const selectedTest = row.siteId;
//     const labtest = this.labtests.find((item: any) => item.lab_test === selectedTest);
  
//     if (labtest) {
//       row.material = labtest.material;
//       row.size = labtest.size;
//       row.image = labtest.image;
//     } else {
//       row.material = "";
//       row.size = "";
//       row.image = "";
//     }
//   }
//   Update lab test details based on lab test selection
// updateDetails(row: any): void {
//   const selectedTest = row.siteId;
//   const labtest = this.labtests.find((item: any) => item.lab_test === selectedTest);

//   if (labtest) {
//     row.details = {
//       material: labtest.material,
//       size: labtest.size,
//       image: labtest.image
//     };
//   } else {
//     row.details = null;
//   }
// }
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProtocolService } from 'src/app/Services/CRO-PROTOCOL/protocol.service';
import { CroService } from 'src/app/Services/CRO/cro.service';
import { LabTestService } from 'src/app/Services/LAB-TEST/lab-test.service';
import { SiteService } from 'src/app/Services/SITE/site.service';
import { SposorService } from 'src/app/Services/SPONSOR/sposor.service';
import { cro } from 'src/app/const.ts/cro';
import { labtest } from 'src/app/const.ts/labtest';
import { site } from 'src/app/const.ts/site';
import { sponsor } from 'src/app/const.ts/sponsor';

interface Row {
numberOfVisits: any;
patientCount: any;
  siteId: string;
  details?: labtest;
}

@Component({
  selector: 'app-protocol-registration',
  templateUrl: './protocol-registration.component.html',
  styleUrls: ['./protocol-registration.component.css']
})
export class ProtocolRegistrationComponent {
  public sponsors: sponsor[] = [];
  public labtests: labtest[] = [];
  public sites: site[] = [];
  public cros: cro[] = [];
  public isEdit: boolean = false;
  public id: any = '';
  public existingRows: Row[] = [];

  public protocolForm: FormGroup = new FormGroup({
    protocol_id: new FormControl(),
    sponsor_id: new FormControl(),
    cro_id: new FormControl(),
    no_of_sites: new FormControl(),
    total_patients: new FormControl(),
    site_ids: new FormControl(),
    screening_kit_count: new FormControl(),
    screening_kit_lab_tests: new FormControl(),
    visit_kit_count: new FormControl(),
    visit_kit_details: new FormControl(),
    no_of_visits: new FormControl(),
    kit_type: new FormControl(),
    lab_id: new FormControl()
  });
KitType: any;
selectedOption: any;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _protocolService: ProtocolService,
    private _sponsorService: SposorService,
    private _labtestService: LabTestService,
    private _siteService: SiteService,
    private _croService: CroService
  ) {
    this._croService.getCro().subscribe(
      (data: cro[]) => {
        this.cros = data;
      },
      (err: any) => {
        alert('Internal server error');
      }
    );

    this._siteService.getSites().subscribe(
      (data: site[]) => {
        this.sites = data;
      },
      (err: any) => {
        alert('Internal server error');
      }
    );

    this._labtestService.getLabTests().subscribe(
      (data: labtest[]) => {
        this.labtests = data;
      },
      (err: any) => {
        alert('Internal server error');
      }
    );

    this._sponsorService.getsponsors().subscribe(
      (data: sponsor[]) => {
        this.sponsors = data;
      },
      (err: any) => {
        alert('Internal server error');
      }
    );

    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.id = data.id;
        this._protocolService.getProtocolDetails(data.id).subscribe(
          (data: any) => {
            this.protocolForm.patchValue(data);
          },
          (err: any) => {
            alert('Internal server error');
          }
        );
      }
    });
  }

  updateDetails(row: Row): void {
    const selectedTest = row.siteId;
    const labtest = this.labtests.find((item: labtest) => item.lab_test === selectedTest);

    // if (labtest) {
    //   row.details = {
    //     lab_test: labtest.lab_test,
    //     material: labtest.material,
    //     size: labtest.size,
    //     image: labtest.image
    //   };
    // } else {
    //   row.details = null;
    // }
  }

  submit() {
    if (this.isEdit) {
      this._protocolService.updateProtocolDetails(this.protocolForm.value, this.id).subscribe(
        (data: any) => {
          alert('Update successful');
        },
        (err: any) => {
          alert('Internal server error');
        }
      );
    } else {
      this._protocolService.CreateProtocolDetails(this.protocolForm.value).subscribe(
        (data: any) => {
          alert('CRO protocol details created successfully');
        },
        (err: any) => {
          alert('Internal server error');
        }
      );
    }
  }

  public addRow(): void {
    const newRow: Row = {
      siteId: 'Select an option',
      details: undefined,
      numberOfVisits: undefined,
      patientCount: undefined
    };
    this.existingRows.push(newRow);
  }
  
  
}

