import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  myForm: any;
  tabs: any[] = []; // Array to hold tabs
  // activeTab: number = ''; // Active tab index
count =2;
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      tabControls: this.fb.array([]) // Create an empty FormArray
    });
  }

  get tabControls(): FormArray {
    return this.myForm.get('tabControls') as FormArray;
  }

  getTabControls(index: number): FormGroup {
    console.log(index);
    
    return this.tabControls.at(index) as FormGroup;

  }

//   addTab() {
//     const newTab = this.fb.group({
//       ckitId: [],
//       kitId: [''],
//       preparation: ['']
//     });
//     this.tabControls.push(newTab);
//     this.tabs.push({});
// }

addTab() {
  for (let i = 0; i < this.count; i++) {
    const newTab = this.fb.group({
      ckitId: [],
      kitId: [''],
      preparation: ['']
    });
    this.tabControls.push(newTab);
    this.tabs.push({});
  }
}


getInputIndexes(): number[] {
  return Array(this.count).fill(0).map((_, index) => index);
}



  submitForm() {
    const allTabsData: any[] = []; // Array to hold all tabs data
  
    // Iterate over each tab control up to the specified count
    for (let i = 0; i < this.count; i++) {
     
    this.tabControls.controls.forEach((tabControl, index) => {
      // Check if the tab index is within the specified count
      if (index < this.count) {
        const formData = tabControl.value;
        allTabsData.push(formData); // Add the tab data to the array
      }
    });
    console.log('All Tabs Data:', allTabsData);
  // Perform further actions with the data from all tabs
  }

  }
}
