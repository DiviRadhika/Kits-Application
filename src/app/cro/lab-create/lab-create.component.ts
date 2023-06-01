import { Component, OnInit } from '@angular/core';
import { CrosService } from '../cros.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lab-create',
  templateUrl: './lab-create.component.html',
  styleUrls: ['./lab-create.component.css']
})
export class LabCreateComponent {
  public isEdit: boolean = false;
  public id: any = '';
  files1: any;
  file2: any;
  public base64textString: string = '';
  public bas2: string = '';
  labData: any;
  imgDisplay: boolean = false
  editImage: boolean = false
  imageChanged: boolean = true;
  fieldDisplay: boolean = true

  constructor(
    private _cro: CrosService,
    private _activatedRoute: ActivatedRoute,
    private _formbuilder: FormBuilder, private route: Router

  ) {
    this._activatedRoute.params.subscribe((data: any) => {
      if (data.id) {
        this.isEdit = true;
        this.imageChanged = true
        this.id = data.id;
        _cro.getTestDetailsById(data.id).subscribe((data: any) => {
          this.labData = data
          this.labForm.controls['lab_test'].setValue(this.labData.lab_test)
          this.labForm.controls['size'].setValue(this.labData.size)
          this.labForm.controls['lab_test'].disable()
          this.editImage = true;
          this.fieldDisplay = false
        });
        console.log(this.id)
      }
    });
  }
  public labForm: FormGroup = new FormGroup({
    lab_test: new FormControl("", [Validators.required]),
    material: new FormControl("", [Validators.required]),
    size: new FormControl("", [Validators.required]),
    image: new FormControl(''),
  });

  uploadFile(evt: any, value: boolean) {

    this.files1 = evt.target.files;
    const file = this.files1[0];
    this.file2 = this.files1[0].name;
    const fileSize = this.files1[0].size;
    if (fileSize >= 1084) {
    }
    if (this.files1 && file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded1.bind(this);
      reader.readAsBinaryString(file);
      this.imageChanged = value
    }
  }

  _handleReaderLoaded1(readerEvt: any) {

    const binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    this.bas2 = 'data:text/html;base64,' + this.base64textString;
    this.bas2 = this.bas2.substring(this.bas2.indexOf(',') + 1);
    this.imgDisplay = true;
    this.editImage = false
  }
  enable() {
    this.editImage = false
    this.fieldDisplay = true
    // this.enable= false
  }
  shouldShowRequired(controlName: string): boolean {
    const control = this.labForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }
  submit() {

    if (this.labForm.invalid) {
      // Mark all form controls as touched to trigger validation
      Object.keys(this.labForm.controls).forEach(key => {
        this.labForm.get(key)?.markAsTouched();
      });
      alert('Please Fill All Mandatory Fields')
    }
   else {

      const data: any =
      {
        "lab_test": this.labForm.get('lab_test')?.value,
        "material": this.labForm.get('material')?.value,
        "size": this.labForm.get('size')?.value,
        "image": this.bas2
      }
      console.log(data)
      if (this.isEdit) {
        if (this.imageChanged == true) {
          data.image = this.labData.email
        }
        else {

        }
        data.lab_test_id = this.id

        this._cro.updateTestDetails(data).subscribe(
          (data: any) => {
            alert('Test results updated successfully');
            this.route.navigate(['/home/cro/labTestGrid'])
          },
          (err: any) => {
            alert('internal server error')
          }
        );

      }
      else {
        this._cro.createTestDetails(data).subscribe(
          (data: any) => {
            alert('Test results created successfully');
            this.route.navigate(['/home/cro/labTestGrid'])
          },
          (err: any) => {
            alert('internal server err');
          }
        );
      }
      console.log(this.labForm.value);
    }
  }
}