import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CrosService } from '../cros.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.css']
})
export class LabTestComponent implements OnInit {
  LabDetails: any[] = [];
  allLabDetails: any;
  materials: any[] = [];
  allmaterials: any;
  page = 1;
  totalCount = 0
  pageSize = 10;
  p = 1;
  searchText = '';
  searchTextm = '';
  lab: boolean = true;
  material: boolean = false;
  public labForm: FormGroup = new FormGroup({
    lab_test: new FormControl("", [Validators.required]),
    classification: new FormControl("")
  })
  labFormval: boolean = false;
  disableAdd: boolean = true
  totalCountmaterial = 0;
  classifications = ['classification1', 'classification2'];
  constructor(private route: Router, private _cro: CrosService,
    private messageService: MessageService, private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.labDetailsData();
    this.meterialsData()
  }
  showLab() {
    this.lab = true
    this.material = false
  }
  showMat() {
    this.lab = false
    this.material = true
  }
  edit(id: any, val: any) {
    this.route.navigate(['/home/cro/updateLabTest', id, val])
  }
  materialCreate() {
    this.route.navigate(['/home/cro/createLabTest'])

  }
 
  labCreate() {
    // this.route.navigate(['/home/cro/createlabtest'])
    this.labFormval = true
    this.disableAdd = false

  }
  labDetailsData() {
    this._cro.getLabTests().subscribe((data: any) => {
      this.LabDetails = data
      this.allLabDetails = data
      this.totalCount = this.LabDetails.length
    })
  }
  meterialsData() {
    this._cro.meterials().subscribe((data: any) => {
      this.materials = data
      this.allmaterials = data
      this.totalCountmaterial = this.materials.length
    })
  }
  confirm2(id: any, name: any) {
    this.confirmationService.confirm({
    
        message: `Are you sure you want to delete the Lab Test '${name}'?`,
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.deletelab(id)
        },
        reject: (type: any) => {
            // switch(type) {
            //     case ConfirmEventType.REJECT:
            //         this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            //     break;
            //     case ConfirmEventType.CANCEL:
            //         this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            //     break;
            // }
        }
    });
}
  pageChangem(event: number) {
    this.page = event;
    this.meterialsData()

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.LabDetails = this.allLabDetails;
    }
    else {
      this.LabDetails = this.allLabDetails.filter(
        (labDetails: any) =>
          (labDetails.name && labDetails.name.toLowerCase().includes(filterValue)) ||
          (labDetails.classfication && labDetails.classfication.toLowerCase().includes(filterValue)) 
          // (labDetails.size && labDetails.size.toLowerCase().includes(filterValue))
      );
    }
  }
  applyFilterm(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    if (filterValue === '') {
      this.materials = this.allmaterials;
    }
    else {
      this.materials = this.allmaterials.filter(
        (labDetails: any) =>
          (labDetails.name && labDetails.name.toLowerCase().includes(filterValue)) ||
          (labDetails.size && labDetails.size.includes(filterValue)) 
          // (labDetails.size && labDetails.size.toLowerCase().includes(filterValue))
      );
    }
  }
  submit() {

    if (this.labForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.labForm.controls).forEach(key => {
        this.labForm.get(key)?.markAsTouched();
      });
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Lab Test' });
    }
    else {
      const data: any =
      {
        "name": this.labForm.get('lab_test')?.value,
        "classfication": this.labForm.get('classification')?.value,
        "created_by": sessionStorage.getItem('userid')
      }
      this._cro.createTestDetails(data).subscribe(
        (data: any) => {
          this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Test results created successfully' });
          this.labForm.reset()
          if (this.route.url === '/home/cro/labTestGrid') {
            this.route.navigate(['/home/cro/labTestGrid'])
            this.labDetailsData()
          }
          else {
            this.route.navigate(['/home/cro/labTestgrid'])
            this.labDetailsData()
          }
          this.labFormval = false
          this.disableAdd = true
        },
        (err: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: err.error.message });


        }
      );
    }

  }
  deletelab(id: any) {
    this._cro.deleteLab(id).subscribe(
      (data: any) => {
        console.log(data)
        this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Test results Deleted successfully' });
        this.labDetailsData()
      });

  }
  pageChange(event: number) {
    this.page = event;
    this.labDetailsData()
  }
}
