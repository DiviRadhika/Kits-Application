import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AdminService } from '../applicationadmin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addprofile: boolean = false
  updatepassword: boolean = false
  @ViewChild('myModal') myModal: any;
  public updatepasswordForm: FormGroup = new FormGroup({
    passwordDetails: new FormControl("", [Validators.required]),
    oldpassword: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl("", [Validators.required]),
    
  
  });


  menuItems :any[] = [];
  profileval: boolean = false;
  fullName: string = ''

  toggleSubItems(item: any) {
    this.menuItems.forEach(menuItem => {
      if (menuItem !== item) {
        menuItem.expanded = false;
      }
    });
    item.expanded = !item.expanded;
  }
  


  public showSubheadings = false;

  role: any 
  adminRole: boolean = false;
  sponsorRole: boolean = false;
  croRole: boolean= false;
  centralLab: boolean = false;
  siteRole: boolean = false;
  ngOnInit(): void {
   

    this.fullName =  sessionStorage.getItem('firstName') + ' '+ sessionStorage.getItem('lastName')
    this.role = sessionStorage.getItem('role')
    if(this.role === 'Admin' ||this.role === 'admin' ){
      this.menuItems = [
        {
          label: 'Application Admin',
          icon: 'bx bxs-user-check',
          // expanded: false,
          subItems: [
            { label: 'CRO Create', link: '/home/admin/croGrid' },
            { label: 'User Create', link: '/home/admin/userGrid' },
            // { label: 'Dashboards', link: '/home/cro/material' }
          ]
        
        
        } ,
        {
          label: 'CRO',
          icon: 'bx bxs-user-check',
          expanded: false,
          subItems: [
            { label: 'Sponsor', link: '/home/cro/sponsorGrid' },
            { label: 'Site', link: '/home/cro/siteGrid' },
            { label: 'LabTest', link: '/home/cro/labTestGrid' },
            { label: 'Study Summary', link: '/home/cro/protocolGrid' }
          ]
        },
        {
          label: 'Central Lab',
          icon: 'bx bxs-analyse',
          expanded: false,
          subItems: [
            { label: 'Kit Prepration', link: '/home/centralLab/kitPrepration' },
            { label: 'Kit Verification', link: '/home/centralLab/kitVerification' },
            { label: 'Kit Distribution', link: '/home/centralLab/kitDistribution' },
            { label: 'Sample Acknowledgement', link: '/home/centralLab/sampleAcknowledgement' },
            { label: 'Sample Reports', link: '/home/centralLab/sampleReports' },
            
          ]
        },
        {
          label: 'CRA',
          icon: 'bx bxs-analyse',
          expanded: false,
          subItems: [
            { label: 'Sample Collection', link: '/home/site/sampleCollection' }
          ]
        }
        
       
     
        // Other menu items for admin role...
      ];
    }
    else if(this.role === 'Sponsor'){
      // this.menuItems = [
      //   {
      //     label: 'Sponsor',
      //     icon: 'bx bxs-user-check',
      //     expanded: false,
      //     subItems: [
      //       { label: 'Protocol', link: '/home/Sponsor/protocol' }
      //     ]
      //   }
      //   // Other menu items for admin role...
      // ];
    }
    else if(this.role === 'CRO'){
      this.menuItems = [
        // {
          // label: 'CRO',
          // icon: 'bx bxs-user-check',
          // expanded: false,
          // subItems: [
            { label: 'Sponsor', link: '/home/cro/sponsorGrid' },
            { label: 'Site', link: '/home/cro/siteGrid' },
            { label: 'LabTest', link: '/home/cro/labTestGrid' },
            { label: 'Study Summary', link: '/home/cro/protocolGrid' }
          // ]
        // },
        // Other menu items for admin role...
      ];
    }
    else if(this.role === 'Central Lab'){
      this.menuItems = [
        // {
          // label: 'Central Lab',
          // icon: 'bx bxs-analyse',
          // expanded: false,
          // subItems: [
            { label: 'Kit Prepration', link: '/home/centralLab/kitPrepration' },
            { label: 'Kit Verification', link: '/home/centralLab/kitVerification' },
            { label: 'Kit Distribution', link: '/home/centralLab/kitDistribution' },
            { label: 'Sample Acknowledgement', link: '/home/centralLab/sampleAcknowledgement' },
            { label: 'Sample Reports', link: '/home/centralLab/sampleReports' },
            
          // ]
        // },
        // Other menu items for admin role...
      ];
    }
    else if(this.role === 'CRA'){
      this.menuItems = [
        // {
          // label: 'CRA',
          // icon: 'bx bxs-analyse',
          // expanded: false,
          // subItems: [
            { label: 'Sample Collection', link: '/home/site/sampleCollection' }
          // ]
        // }
        // Other menu items for admin role...
      ];
    }
    const navLinks = document.querySelectorAll('.nav-link');
    const collapses = document.querySelectorAll('.collapse');

    navLinks.forEach(navLink => {
      navLink.addEventListener('click', () => {
        const currentCollapse = navLink.nextElementSibling as HTMLElement;

        collapses.forEach(collapse => {
          if (collapse !== currentCollapse) {
            collapse.classList.remove('show');
          }
        });
      });
    });
  }
  showLogout:boolean=false;
  toggleLogout(){
    this.showLogout=!this.showLogout
  }
 
  profile(){
    this.addprofile= true
  }
  update(){
    this.updatepassword=true
  }
  clear(){
    sessionStorage.clear()
  }
  sidebarToggle!: HTMLElement;
  sidebar!: HTMLElement;
  isSidebarShrunk: boolean;

constructor(private messageService:MessageService ,private admin: AdminService, private route: Router, private formBuilder: FormBuilder,) {
    this.isSidebarShrunk = false;
  }
  reset(){
    this.addprofile= true
 const obj ={
  
  email: sessionStorage.getItem('emailval'),
  password: this.updatepasswordForm.controls['confirmPassword'].value,
  otp: 123456,
  is_forgot: false
  
 }
    // alert('Profile created Successfully')
    //           this.route.navigate(['/login'])
              if (this.updatepasswordForm.controls['password'].value === '' || this.updatepasswordForm.controls['password'].value === undefined) {
                // alert('Please Enter Password')
                this.messageService.add({severity:'warn', summary:'Warning Message', detail:'Please Enter Password'});
              }
              else if (this.updatepasswordForm.controls['confirmPassword'].value === undefined || this.updatepasswordForm.controls['confirmPassword'].value === '') {
                // alert('Please Enter Confirm Password')
                this.messageService.add({severity:'warn', summary:'Warning Message', detail:'Error occurred while resetting password'});
              }
              else {
          
                this.admin.reset(obj).subscribe(
                  (data: any) => {
                    this.messageService.add({severity:'success', summary:'Success Message', detail:'Password Reset Successfully'});
          
                    this.route.navigate(['/login']);
                    console.log(data);
                    sessionStorage.setItem('role', data.role);
                    sessionStorage.setItem('access_token', data.access_token);
                    this.myModal.hide();
                  },
                  (err: any) => {
                    console.log(err); // Log the specific error message to the console
               
                    this.messageService.add({severity:'error', summary:'Error Message', detail:'Error occurred while resetting password'});
                  }
                );
                ;
          
              }
          
            }

  ngAfterViewInit() {
    this.sidebarToggle = document.getElementById('sidebar-toggle')!;
    this.sidebar = document.getElementById('sidebar')!;

    if (this.sidebarToggle && this.sidebar) {
      this.sidebarToggle.addEventListener('click', () => {
        if (this.isSidebarShrunk) {
          this.sidebar.style.width = '200px'; // Expand the sidebar
        } else {
          this.sidebar.style.width = '100px'; // Shrink the sidebar
        }

        this.isSidebarShrunk = !this.isSidebarShrunk;
      });
    }
  }
}