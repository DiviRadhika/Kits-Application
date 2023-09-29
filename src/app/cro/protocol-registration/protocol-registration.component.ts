import { Component, NgModule } from '@angular/core';
import { ProtocolService } from './protocol-registration.service';
import { Form, FormBuilder, FormControl, FormsModule, FormArray, FormGroup, UntypedFormArray, UntypedFormGroup, Validators, ValidatorFn } from '@angular/forms';
import { CrosService } from '../cros.service';
import { AdminService } from 'src/app/applicationadmin/admin.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-protocol-registration',
  templateUrl: './protocol-registration.component.html',
  styleUrls: ['./protocol-registration.component.css']
})
export class ProtocolRegistrationComponent {
  sponsorName: any;
  buttonClickedFlags: any;
  getCurrentYear(): number {
    return new Date().getFullYear();
  }
  selectedOptions: { [rowIndex: number]: string[] } = {};
  selectedLabTests: any[] = [];
  alternatenames: any[] = [];
  labMatTestsList: Array<any> = [];
  screening: boolean = true;
  visit: boolean = false;
  valueVisit: any = 0;
  listItems: string[] = [];
  listTabs: string[] = [];
  tabnum: number = 0;
  matList: any;
  materials: string[] = [];
  vmatList: any;
  display: boolean = false;
  displayv: boolean = false;
  multipleTests: any[] = []
  multipleTestsv: any[] = []
  testDisplay: boolean = false;
  testDisplayv: boolean = false;
  testDisplamaterials: boolean = false;
  multipleTestsId: any[] = []
  multipleTestsvId: any[] = []
  selectedValue: any;
  selectedValuev: any;
  formData: any;

  labMatList: any;


  selectedOption: any;
  varientValues: any[] = []
  valueVariant: any;
  materialhide: boolean = false;
  visible: boolean = false;
  variantsTab: boolean = false;
  indexs: number = 0;
  selectedVisitsData: any;
  selectedVisitsAsObjects: any[] = [];
  rowIndexToCollect: number | undefined;
  variant: any;
  outerObj: any;
  // MaterialList: FormArray = new FormArray([])
  constructor(private protocolService: ProtocolService,
    private route: Router, private fb: FormBuilder,
    private adminService: AdminService,
    private croService: CrosService,
    private formBuilder: FormBuilder,
    private messageService: MessageService) { };
  sponsers: Array<any> = [];

  crosList: Array<any> = [];
  protocolList: Array<any> = [];
  labTestsList: Array<any> = [];
  sites: Array<any> = [];
  slist: any
  sizeValues: { [index: number]: string[] } = {};
  sizeValuesv: { [index: number]: string[] } = {};
  mlist: any
  files1: any;
  file2: any;
  selectedMaterials: any[] = [];
  public base64textString: string = '';
  public bas2: string = '';
  selectedTests: any
  kitCountval: string = ''

  public protocolForm: FormGroup = new FormGroup({
    selected_protocol_id: new FormControl("", [Validators.required]),
    selected_protocol_name: new FormControl("", [Validators.required]),
    selected_sponsor_id: new FormControl("", [Validators.required]),
    cro_study_id: new FormControl(""),
    avant_sample_size: new FormControl(""),
    global_sample_size: new FormControl("", [Validators.required]),
    screens: new FormControl("", [Validators.required]),
    total_visits: new FormControl("", [Validators.required]),
    kit_variant_count: new FormControl("", [Validators.required]),
    selected_skit_count: new FormControl("", [Validators.required]),
    // labTestValue: new FormControl("", [Validators.required]),
    specialInstructions: new FormControl(""),
    avantc: new FormControl(false),
    selected_visit_count: new FormControl("", [Validators.required]),
  })


  VisitKitMatForm: any;
  sitesForm: any;
  ScreenKitForm: any;
  ScreenMaterialKitForm: any;
  VisitKitForm: any;
  customerFormGroup: any;

  ngOnInit() {

    this.croService.getsponsors().subscribe((sponsers) => {
      this.sponsersData(sponsers);
    });


    this.croService.getLabTests().subscribe((labTestsList) => {
      this.matList = labTestsList
      this.vmatList = labTestsList

    });
    this.croService.getLabTests().subscribe((labTestsList) => {
      this.vmatList = labTestsList

    });


    this.croService.meterials().subscribe((data: any) => {

      this.materials = data
      this.labMatData(data)

    })

    this.adminService.getCro().subscribe((crosList) => {
      this.crosData(crosList);
    });


    this.customerFormGroup = this.formBuilder.group({
      sitesList: this.formBuilder.array([])

    });



    this.ScreenMaterialKitForm = this.formBuilder.group({
      kitVarient: new FormControl("", [Validators.required]),
      materialList: this.formBuilder.array([])

    })
    const materialControls = this.ScreenMaterialKitForm.get('materialList').controls;
    // const materialControls = this.ScreenMaterialKitForm.get('materialList').controls;
    this.selectedVisitsData = new Array(materialControls.length).fill(null);



    materialControls.forEach((control: any, index: any) => {
      control.get('visits').valueChanges.subscribe(() => {
        const selectedValues = control.get('visits').value || [];
        const uniqueValues = new Set(selectedValues);

        if (selectedValues.length !== uniqueValues.size) {
          control.get('visits').setValue([]); // Clear the control value
          // Optionally, you can display an error message as well.
          // this.errorMessage = 'You have already selected this value in another row.';
        }
      });
    });
    this.VisitKitMatForm = this.formBuilder.group({

      materialList: this.formBuilder.array([this.addVisitKitMatData()])

    })

  }
  // Inside your component class
  // Inside your component class
  // Inside your component class
  // Inside your component class
  // Inside your component class
  // Inside your component class
  latestDuplicateRow: number | null = null;
  showAlert = false;

  hasDuplicateSelection(rowIndex: number): boolean {
    const materialControls = this.ScreenMaterialKitForm.get('materialList').controls;
    const selectedControl = materialControls[rowIndex].get('visits');

    const selectedValue = selectedControl.value;

    if (selectedValue && selectedValue.length > 0) {
      for (let i = 0; i < materialControls.length; i++) {
        if (i !== rowIndex) {
          const otherSelectedValue = materialControls[i].get('visits').value;
          if (otherSelectedValue && otherSelectedValue.some((val: any) => selectedValue.includes(val))) {
            if (!this.showAlert) {
              this.showAlert = true;
              this.latestDuplicateRow = i; // Store the index of the latest duplicate row
              setTimeout(() => {
                alert('You have already selected this Visit for in another Variant.');
                this.showAlert = false;
                if (this.latestDuplicateRow !== null) {
                  materialControls[this.latestDuplicateRow].get('visits').setValue([]); // Clear the value in the latest duplicate row
                  this.latestDuplicateRow = null; // Reset the latest duplicate row
                }
              }, 0);
            }
            return true; // Duplicate found
          }
        }
      }
    }

    return false;
  }



  openDialog(rowIndex: number) {
    this.selectedVisitsAsObjects = [];
    const materialControls = this.ScreenMaterialKitForm.get('materialList').controls;
    const selectedControl = materialControls[rowIndex].get('visits');
    this.variant = materialControls[rowIndex].get('variant').value;

    const selectedVisits = selectedControl.value || null; // Initialize as null if needed

    this.selectedVisitsAsObjects = selectedVisits.map((visit: any) => ({ row: rowIndex, variant: this.variant, key: visit, value: visit, name: '', }));


    this.display = true; // Set the dialog to visible
  }

  rowCollectedData: Array<any> = [];
  openUploadDialog(rowIndex: number) {
    const materialControls = this.ScreenMaterialKitForm.get('materialList').controls;
    const selectedControl = materialControls[rowIndex].get('visits');
    this.variant = materialControls[rowIndex].get('variant').value;
    const selectedVisits = selectedControl.value || null;
    if (selectedVisits === null || selectedVisits === undefined || selectedVisits === '') {
      alert('Please select atleast one visit to assign names')
    }
    else {
      this.openDialog(rowIndex);
      this.rowIndexToCollect = rowIndex;
    }
  }

  collectedData: Array<{ selectedVisit: string, name: string }> = [];

  collectDataAndClose() {
    const selectedVisits = this.selectedVisitsAsObjects.map((data: any) => ({
      selectedVisit: data.key,
      name: data.name,
      variant: data.variant
    }));

    let allNamesNotEmpty = true; // Assume all names are not empty initially

    for (let i = 0; i < selectedVisits.length; i++) {
      if (selectedVisits[i].name === '') {
        alert('Please assign a name for ' + selectedVisits[i].selectedVisit);
        allNamesNotEmpty = false; // Mark that at least one name is empty
        break; // Exit the loop if any name is empty
      }
    }

    if (allNamesNotEmpty) {
      if (this.rowIndexToCollect !== undefined) {
        this.rowCollectedData[this.rowIndexToCollect] = selectedVisits;
        this.rowIndexToCollect = undefined; // Reset the row index
      }

      this.display = false; // Only set this.display to false if all names are not empty
    }

  }

  avantCheck(event: any) {

    if (event.target.checked == true) {
      this.protocolForm.controls['avant_sample_size'].setValue(this.protocolForm.controls['global_sample_size'].value)
      this.protocolForm.controls['avant_sample_size'].disable()
    }
    else {

      this.protocolForm.controls['avant_sample_size'].setValue('')
      this.protocolForm.controls['avant_sample_size'].enable()
    }
  }
  getsize() {

    if (this.protocolForm.controls['avant_sample_size'].value > this.protocolForm.controls['global_sample_size'].value) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Avant Sante Sample Size should be less than Global Sample Size' });

    }
    else {

    }
  }
  labValues() {
    this.multipleTests = [];
    if (this.protocolForm.controls['labTestValue'].value === '' || this.protocolForm.controls['labTestValue'].value === undefined ||
      this.protocolForm.controls['labTestValue'].value === null) {
      this.multipleTests = [];

    } else {
      this.protocolForm.controls['labTestValue'].value.forEach((element: any) => {

        this.testDisplay = true;

        this.multipleTestsId.push(element.lab_id);
        this.multipleTests.push(element.name);
        this.display = false
      });
    }


  }
  materialvalues() {
    this.displayva = false
    this.testDisplamaterials = true;
    // this.multipleTestsv = [];
    // if (this.protocolForm.controls['labTestValuev'].value === '' || this.protocolForm.controls['labTestValuev'].value === undefined ||
    // this.protocolForm.controls['labTestValuev'].value === null) {
    //   this.multipleTestsv = [];

    // } else {
    //   this.protocolForm.controls['labTestValuev'].value.forEach((element: any) => {

    //   this.testDisplayv = true;
    //   this.multipleTestsvId.push(element.lab_id);
    //     this.multipleTestsv.push(element.name);
    //     this.displayv = false
    //   });
    // }

  }
  labValuesv() {
    this.displayv = false
    this.testDisplayv = true;
    // this.multipleTestsv = [];
    // if (this.protocolForm.controls['labTestValuev'].value === '' || this.protocolForm.controls['labTestValuev'].value === undefined ||
    // this.protocolForm.controls['labTestValuev'].value === null) {
    //   this.multipleTestsv = [];

    // } else {
    //   this.protocolForm.controls['labTestValuev'].value.forEach((element: any) => {

    //   this.testDisplayv = true;
    //   this.multipleTestsvId.push(element.lab_id);
    //     this.multipleTestsv.push(element.name);
    //     this.displayv = false
    //   });
    // }

  }
  get customerAddressDTOList() {
    return <FormArray>this.customerFormGroup.controls['sitesList'];
  }
  dialog() {
    this.display = true
  }
  dialogv() {
    this.displayv = true
  }

  removeMatScreenKit(j: number) {
    this.ScreenMaterialKitForm.get('materialList').removeAt(j);
  }
  removeVisitMatKit(j: number) {
    this.VisitKitMatForm.get('materialList').removeAt(j);
  }
  showsc() {
    this.screening = true;
    this.visit = false
  }

  showv() {
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
  get materialList(): FormArray {
    return this.VisitKitMatForm.get('materialList') as FormArray;
  }
  displayva: boolean = false;
  dialogva() {
    this.displayva = true
  }
  variantCount() {
    this.visible = true
    this.protocolForm.controls['total_visits'].setValue('')
    this.cards = [];
    this.valueVariant = this.protocolForm.controls['kit_variant_count'].value;
    for (let i = 1; i <= this.valueVariant; i++) {
      this.addCard();
     
    }

    this.varientValues = []
    this.variantsTab = false
  }
  generateVisitOptions(value: number, rowIndex: number): void {
    const selectedValues = this.getSelectedValuesUpToRow(rowIndex);
    this.visitcount = [];
    for (let i = 1; i <= value; i++) {
      const visitValue = 'visit' + i;
      if (!selectedValues.includes(visitValue)) {
        this.visitcount.push({ value: visitValue });
      }
    }
  }
  getSelectedValuesUpToRow(rowIndex: number): string[] {
    const selectedValues = [];
    for (let i = 0; i <= rowIndex; i++) {
      if (this.selectedOptions[i]) {
        selectedValues.push(...this.selectedOptions[i]);
      }
    }
    return selectedValues;
  }

  visitcount: Array<any> = [];
  visits(value: any) {
    this.visitcount = []
    if (value != null || value != undefined || value != '') {
      this.variantsTab = true
      this.valueVisit = this.protocolForm.controls['total_visits'].value;
      // this.cards = [];
      for (let i = 0; i <= this.valueVisit - 1; i++) {
        this.visitcount.push({ value: 'visit' + (i + 1) });
      }
      for (let i = 0; i <= this.valueVariant; i++) {
        this.adjustScreenKitRows(i)


      }
    }


  }
  onSelectChange(rowIndex: number, selectedValues: string[]): void {
    this.selectedOptions[rowIndex] = selectedValues;
    this.updateVisitOptions();
  }
  updateVisitOptions(): void {
    const selectedVisitValues = Object.values(this.selectedOptions).flat();
    this.visitcount = this.visitcount.filter(option => !selectedVisitValues.includes(option.value));
  }

  adjustScreenKitRows(count: number) {

    const screenKitList = this.ScreenMaterialKitForm.get('materialList') as FormArray;
    const currentRowCount = screenKitList.length;

    if (count < currentRowCount) {
      // Remove excess rows
      for (let i = currentRowCount - 1; i >= count; i--) {
        screenKitList.removeAt(i);
      }
    } else if (count > currentRowCount) {
      // Add new rows
      for (let i = currentRowCount; i < count; i++) {
        this.onMaterialKitAdd(i);

        this.ScreenMaterialKitForm.get('materialList').controls[i].get('variant').patchValue('Variant' + (i + 1))
        this.ScreenMaterialKitForm.get('materialList').controls[i].get('variant').disable

      }
    }



  }
  availableMaterialIds: any[] = [];

  // ... Other code ...

  onMaterialIdSelect(selectedId: any, rowIndex: number) {
    // Remove the selected ID from the available IDs array
    this.availableMaterialIds[rowIndex] = this.visitcount.filter(id => id !== selectedId);

    // Update the available IDs for subsequent rows
    for (let i = rowIndex + 1; i < this.ScreenMaterialKitForm.get('materialList').length; i++) {
      this.availableMaterialIds[i] = [...this.availableMaterialIds[i - 1]];
    }
  }
  disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  enableScroll() {
    document.body.style.overflow = 'auto';
  }
  onMaterialKitAdd(rec: any) {

    //this.ScreenKitForm.get('labTestsList').push(this.addScreenKitData());
    const control1 = this.ScreenMaterialKitForm.get('materialList') as FormArray;
    control1.push(this.addScreenmKitData(rec));

  }
  addScreenKitData() {
    return this.formBuilder.group({
      lab_test_id: [''],

    })
  }
  addScreenmKitData(rec: string) {
    return this.formBuilder.group({

      visits: new FormControl("", [Validators.required]),
      variant: new FormControl("", [Validators.required, duplicateSelectionValidator()]),

    })
  }

  addVisitKitMatData() {
    return this.formBuilder.group({
      meterial_id: new FormControl("", [Validators.required]),
      size: new FormControl("", [Validators.required]),
      quqntity: new FormControl("", [Validators.required]),
      frozen_status: new FormControl(false, [Validators.required]),
      material_name: [''],
      image: ['']
    })
  }
  addScreenKit() {
    this.ScreenKitForm.get('labTestsList').push(this.addScreenKitData());

  }


  addVisitMatKit() {
    this.VisitKitMatForm.get('materialList').push(this.addVisitKitMatData());
  }


  sponsersData(sponsers: any) {
    sponsers.forEach((sponser: any) => {
      this.sponsers.push(sponser);
    });


  }

  labTestsData(labTestsList: any) {
    labTestsList.forEach((labTests: any) => {
      this.labTestsList.push(labTests);
    });

  }

  labMatData(labMatList: any) {
    labMatList.forEach((labTests: any) => {
      this.labMatTestsList.push(labTests);
    });

  }


  crosData(crosList: any) {
    crosList.forEach((cros: any) => {
      this.crosList.push(cros);
    });
  }

  sitesData(sites: any) {
    sites.forEach((site: any) => {
      this.sites.push(site);
    });

  }

  shouldShowRequired(controlName: string): boolean {
    const control = this.protocolForm.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched) || false;
  }
  sponsorname() {
    this.croService.getSponsorById(this.protocolForm.controls['selected_sponsor_id'].value).subscribe((data: any) => {
      console.log(data)
      this.sponsorName = data.sponsor_name
    });

  }

  toTitleCase(str: string): string {

    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }
  SubmitData() {



    const errorMessages = [];
    const errorMessagesalter = [];
    const formData: { selectedLabTests: any[], visits: any[] }[] = [];
    const firstCardData: { selectedLabTests: any[], visits: any[] } = {
      selectedLabTests: [],
      visits: []
    };
    const remainingCardData: { selectedLabTests: any[], visits: any[] }[] = [];
    for (const [index, card] of this.cards.entries()) {
      const cardForm = card.form;
      const rowsArray = cardForm.get('visits') as FormArray;
      const cardData = {
        selectedLabTests: this.selectedLabTests[this.cards.indexOf(card)] as any[],
        visits: [] as any[]
      };
      if (cardData.selectedLabTests.length === 0) {
        errorMessages.push(`Please select lab tests in All visits`);
      }
      else {
      }
      for (const row of rowsArray.controls) {
        const rowForm = row as FormGroup;
        cardData.visits.push(rowForm.value);
      }

      formData.push(cardData);

      // for (let index = 0; index < this.rowCollectedData.length; index++) {
      //   if (index < formData.length) {
      //     this.outerObj = this.rowCollectedData[index];
      //     const innerObj = formData[index];

      //     // Merge selectedLabTests arrays
      //     this.outerObj.selectedLabTests.push(...innerObj.selectedLabTests);

      //     // Merge visits arrays
      //     this.outerObj.visits.push(...innerObj.visits);

      //   }

      // }
      // console.log(this.outerObj)


      // if (index === 0) {
      //   firstCardData.selectedLabTests = cardData.selectedLabTests;
      //   firstCardData.visits = cardData.visits;
      // } else {
      //   remainingCardData.push(cardData);
      // }

    }

    if (errorMessages.length > 0) {
      const combinedErrorMessage = errorMessages.join('\n');
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Lab Tests in All Variants' });
    }
    // else if (errorMessagesalter.length > 0) {
    //   const combinedErrorMessage = errorMessagesalter.join('\n');
    //   this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please give Alternate Week Name in All visits' });
    // }
    else if (this.protocolForm.controls['avant_sample_size'].value > this.protocolForm.controls['global_sample_size'].value) {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Avant Sante Sample Size should be less than Global Sample Size' });

    }
    // else if (this.kitCountval === '') {
    //   this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Enter Visit Kit Count' });

    // }


    else {

      if (this.protocolForm.invalid) {
        // if (this.protocolForm.controls['labTestValue'].value === undefined || this.protocolForm.controls['labTestValue'].value === '' ||
        //   this.protocolForm.controls['labTestValue'].value === null) {
        //   this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Select Lab Tests In Screening' });
        // }

        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Please Fill All Mandatory Fields' });
        Object.keys(this.protocolForm.controls).forEach((key) => {
          this.protocolForm.get(key)?.markAsTouched();
        });

      }
      else {
        const sc = this.ScreenMaterialKitForm.value.materialList


        for (let rowIndex = 0; rowIndex < this.rowCollectedData.length; rowIndex++) {
          const rowArray = this.rowCollectedData[rowIndex];

          for (let innerIndex = 0; innerIndex < rowArray.length; innerIndex++) {
            const innerObject = rowArray[innerIndex];

            const matchingSC = sc.find((scObj: any) =>
              scObj.variant === innerObject.variant
            );

            if (matchingSC) {
              if (!matchingSC.rowCollectedData) {
                matchingSC.rowCollectedData = [];
              }
              matchingSC.rowCollectedData.push(innerObject);
            }
          }
        }
        for (let index = 0; index < sc.length; index++) {
          if (index < formData.length) {
            sc[index].selectedLabTests = formData[index].selectedLabTests;
            sc[index].materials = formData[index].visits;
          }
        }


        if (this.protocolForm.controls['selected_protocol_name'].value) {
          this.protocolForm.controls['selected_protocol_name'].setValue(this.toTitleCase(this.protocolForm.controls['selected_protocol_name'].value));
        }
        const data = {
          "protocol_id": this.protocolForm.controls['selected_protocol_id'].value,
          "protocol_name": this.protocolForm.controls['selected_protocol_name'].value,
          "sponsor_id": this.protocolForm.controls['selected_sponsor_id'].value,
          "cro_id": this.protocolForm.controls['cro_study_id'].value,
          "no_of_visits": Number(this.protocolForm.controls['total_visits'].value),
          "no_of_screens": Number(this.protocolForm.controls['screens'].value),
          "global_sample_size": Number(this.protocolForm.controls['global_sample_size'].value),
          "avant_sample_size": Number(this.protocolForm.controls['avant_sample_size'].value),
          "special_instructions": this.protocolForm.controls['specialInstructions'].value,
          "kit_variant_count": Number(this.protocolForm.controls['kit_variant_count'].value),
          "sponsor_name": this.sponsorName,
          "screening_kit_details": [
            {
              "screening_kit_count": Number(this.protocolForm.controls['selected_skit_count'].value),

              "meterial_details": ''



            }
          ],
          "visit_kit_details": [
            {
              "visit_kit_count": Number(this.protocolForm.controls['selected_visit_count'].value),
              "meterial_details": ''
            }
          ],
          "variants": sc

        }





        this.protocolService.postProtocol(data).subscribe(
          (data: any) => {
            this.route.navigate(['home/cro/protocolGrid'])
            setTimeout(() => {
              this.messageService.add({ severity: 'success', summary: 'Success Message', detail: 'Study Added Successfully' });

            }, 1000);

            // this.route.navigate(['/home/cro/protocolView'])
          },
          (err: any) => {
            const message = err.error.message

            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: message });
          }
        );
      }
    }
  }
  image_url: any;

  sizeOptions: { [index: number]: string[] } = {};

  getSizes(index: number) {
    const materialList = this.ScreenMaterialKitForm.controls['materialList'] as FormArray;
    const item = materialList.at(index) as FormGroup;
    const selectedValue = item.controls['meterial_id'].value;
    const selectedItem = this.labMatTestsList.find((lab: any) => lab.meterial_id === selectedValue);

    if (selectedItem) {
      return selectedItem.size;
    }

    return [];
  }

  onScreenKitChange(evt: any, index: any) {
    this.selectedValue = evt.target.value;
    // Find the selected item based on the selectedValue
    const selectedItem = this.labMatTestsList.find(item => item.meterial_id === this.selectedValue);

    if (selectedItem) {
      const selectedName = selectedItem.name;
      console.log(selectedName)
      const selectedSize = selectedItem.size;
      const selectedImageString = selectedItem.image;
      // Clear and update the 'size' control in the FormArray
      const sizeControl = this.ScreenMaterialKitForm.controls.materialList.controls[index].get('size');
      sizeControl.setValue(''); // Clear the value
      // Update the 'sizeValues' array for dropdown options
      this.sizeValues = [...selectedSize];
      // Set the 'size' control value to the first option (if desired)
      if (selectedSize.length > 0) {
        sizeControl.setValue(selectedSize[0]);
      }
      this.ScreenMaterialKitForm.controls.materialList.controls[index].get('frozen_status').setValue(false);
      // this.ScreenMaterialKitForm.controls.materialList.controls[index].get('material_name').setValue(selectedName);
      // Set the 'image' control value
      const img = new Image();
      img.src = 'data:image/jpeg;base64,' + selectedImageString;
      this.image_url = img.src;
      this.ScreenMaterialKitForm.controls.materialList.controls[index].get('image').setValue(img.src);
    }
  }

  getSizev(index: number) {
    const materialListv = this.VisitKitMatForm.controls['materialList'] as FormArray;
    const item = materialListv.at(index) as FormGroup;
    const selectedValuev = item.controls['meterial_id'].value;
    const selectedItemv = this.labMatTestsList.find((lab: any) => lab.meterial_id === selectedValuev);

    if (selectedItemv) {
      return selectedItemv.size;
    }

    return [];
  }

  onVisitKitMatChange(evt: any, index: any) {
    this.selectedValuev = evt.target.value;
    const selectedItem = this.labMatTestsList.find(item => item.meterial_id === this.selectedValuev);
    if (selectedItem) {
      const selectedSizev = selectedItem.size;
      const selectedImageStringv = selectedItem.image;
      const sizeControl = this.VisitKitMatForm.controls.materialList.controls[index].get('size');
      sizeControl.setValue('');
      this.sizeValuesv = [...selectedSizev];
      if (selectedSizev.length > 0) {
        sizeControl.setValue(selectedSizev[0]);
      }
      const img = new Image();
      img.src = 'data:image/jpeg;base64,' + selectedImageStringv;
      this.image_url = img.src;
      this.VisitKitMatForm.controls.materialList.controls[index].get('image').setValue(img.src);
      this.VisitKitMatForm.controls.materialList.controls[index].get('frozen_status').setValue(false);
    }

  }

  cards: { form: FormGroup }[] = [];
  // addMaterialClicked(cardIndex: number) {
  //   // Check if the button has already been clicked for this card
  //   if (!this.buttonClickedFlags[cardIndex]) {
  //     // Perform the action for the first click (e.g., disable button)
  //     this.buttonClickedFlags[cardIndex] = true;
  //     // Add your additional logic here
  //   }
  // }

  addCard() {
    // this.cards.forEach(() => {
    //   this.buttonClickedFlags.push(false);
    // });
    const initialRowsCount = this.cards.length + 1; // Calculate the desired number of initial rows based on index
    const rowsArray = new FormArray([]);
    const cardForm = this.fb.group({
      kitVarient: new FormControl(""),
      visits: rowsArray
    });
    this.cards.push({ form: cardForm });
    this.selectedLabTests.push([]);
    this.alternatenames.push([])
  }

  getVariant(val: any, tab: any) {
    console.log(this.valueVariant);

    const existingIndex = this.varientValues.findIndex((variant: any) => variant.row === tab);

    // Check if the entered value already exists in any row (case-insensitive)
    const valueExists = this.varientValues.some((variant: any) => variant.value.toLowerCase() === val.target.value.toLowerCase());

    if (!valueExists) {
      if (existingIndex !== -1) {
        // Update the existing value if the row is found
        this.varientValues[existingIndex].value = val.target.value;
      } else if (this.varientValues.length <= this.valueVariant - 1 && val.target.value.trim() !== '') {
        // Push the new value into the 'varientValues' array if not empty
        this.varientValues.push({ row: tab, value: val.target.value });
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Not Allowed, adding more than specified Variant Count' });
        this.errorRows.add(tab);
        this.cards[tab].form.controls['kitVarient'].reset();
      }
      console.log(this.varientValues);
    } else if (existingIndex !== -1) {
      // Remove the duplicate value if it's found in a different row
      this.varientValues.splice(existingIndex, 1);
      this.errorRows.delete(tab);
      console.log(this.varientValues);
    }

    // If the value is empty, remove the row from varientValues
    if (val.target.value.trim() === '') {
      const indexToRemove = this.varientValues.findIndex((variant: any) => variant.row === tab);
      if (indexToRemove !== -1) {
        this.varientValues.splice(indexToRemove, 1);
        this.errorRows.delete(tab);
      }
    }
  }



  errorRows: Set<any> = new Set(); // Set to track rows with errors

  shouldShowErrorMessage(tab: any): boolean {
    return this.errorRows.has(tab);
  }
  onMeterialIdChange(event: any, cardIndex: number, rowIndex: number) {
    const selectedValue = event.target.value;
    const cardForm = this.cards[cardIndex].form;
    // Find the selected option in the labMatTestsList
    this.selectedOption = this.labMatTestsList.find((option) => option.meterial_id === selectedValue);
    if (this.selectedOption) {
      const selectedName = this.selectedOption.name;
      console.log(selectedName)
      const rowFormArray = this.getRows(cardIndex);
      const rowFormGroup = rowFormArray?.at(rowIndex) as FormGroup;
      if (rowFormGroup) {
        const variantControl = rowFormGroup.get('variant');
        const imageControl = rowFormGroup.get('image');
        if (variantControl) {
          variantControl.setValue(this.selectedOption.name);
        }
        if (imageControl) {
          imageControl.setValue(this.selectedOption.image);
        }
      }
      //  this.ScreenMaterialKitForm.controls.materialList.controls[index].get('material_name').setValue(selectedName);
      rowFormGroup.get('material_name')?.setValue(selectedName);
      this.materialhide = false
      rowFormGroup.get('image')?.setValue('data:image/jpeg;base64,' + this.selectedOption.image);
      rowFormGroup.get('size')?.setValue('');
    }
  }
  getSizesv(cardIndex: number, rowIndex: number): any {
    const rowFormArray = this.getRows(cardIndex);
    const rowFormGroup = rowFormArray.at(rowIndex) as FormGroup;
    const selectedMaterialId = rowFormGroup.get('meterial_id')?.value;

    if (selectedMaterialId) {
      const selectedOption = this.labMatTestsList.find((option) => option.meterial_id === selectedMaterialId);

      if (selectedOption) {
        return selectedOption.size;
      }
    }

    return [];
  }

  getMaterialId(cardIndex: number, rowIndex: number): string {
    const cardFormArray = this.getRowsFormArray(cardIndex);
    const rowFormGroup = cardFormArray.at(rowIndex) as FormGroup;
    return rowFormGroup.get('material_id')?.value;
  }
  addRow1(cardIndex: number) {
    const cardFormArray = this.getRowsFormArray(cardIndex);
    cardFormArray.push(this.createRow());
  }

  deleteRow(cardIndex: number, rowIndex: number) {
    const cardFormArray = this.getRowsFormArray(cardIndex);
    cardFormArray.removeAt(rowIndex);
  }
  // selectedLabTests: any[] = [];
  createRow(): FormGroup {

    return this.fb.group({
      meterial_id: ['', Validators.required],
      size: ['', Validators.required],
      image: ['', Validators.required],
      quantity: ['', Validators.required],
      frozen_status: [''],
      material_name: ['']
    });
  }

  getRowsFormArray(cardIndex: number): FormArray {
    const cardForm = this.cards[cardIndex].form;
    return cardForm.get('visits') as FormArray;
  }
  getRows(cardIndex: number): FormArray {
    const card = this.cards[cardIndex];
    return card.form.get('visits') as FormArray;
  }

  ValidateVisits(input: any) {
    let inputValue = input.value.trim();
    //Remove non-numeric charecters
    let numericValue = inputValue.replace(/\D/g, '');

    if (numericValue.length > 5) {
      numericValue = numericValue.slice(0, 5);
    }

    input.value = numericValue;

  }
  // ValidateScreening(input: any) {
  //   let inputValue = input.value.trim();
  //   //Remove non-numeric charecters
  //   let numericValue = inputValue.replace(/\D/g, '');

  //   if (numericValue.length > 5) {
  //     numericValue = numericValue.slice(0, 5);
  //   }

  //   input.value = numericValue;

  // }
  validateMobileNumber(input: any, phone: any) {
    let inputValue = input.value.trim();

    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');

    if (phone === 'mobile') {
      if (numericValue.length > 5) {
        numericValue = numericValue.slice(0, 5);
      }
    }
    else {
      if (numericValue.length > 5) {
        numericValue = numericValue.slice(0, 5);
      }
    }

    input.value = numericValue;

  }











}
import { AbstractControl } from '@angular/forms';

function duplicateSelectionValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const selectedValues = control.value || [];
    const uniqueValues = new Set(selectedValues);

    if (selectedValues.length !== uniqueValues.size) {
      return { duplicateSelection: true };
    }

    return null;
  };
}