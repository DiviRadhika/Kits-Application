
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfirmationService,ConfirmEventType, MessageService } from 'primeng/api';
import { AdminService } from '../applicationadmin/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  addprofile: boolean = false
  updatepassword: boolean = false
  passwordvisible:boolean = false;
  showPassword: boolean = false;

  @ViewChild('myModal') myModal: any;
 

  menuItems :any[] = [];
  profileval: boolean = false;
  fullName: any
  log: boolean = false;

  toggleSubItems(item: any) {
    this.menuItems.forEach(menuItem => {
      if (menuItem !== item) {
        menuItem.expanded = false;
      }
    });
    item.expanded = !item.expanded;
  }
  

  constructor(private messageService:MessageService ,private admin: AdminService, private route: Router,
    private formBuilder: FormBuilder, private confirmationService: ConfirmationService, private router: Router) {
     this.isSidebarShrunk = false;
 
 
     
   }

  public showSubheadings = false;
  public updatepasswordForm: FormGroup = new FormGroup({
    passwordDetails: new FormControl("", [Validators.required]),
    email:new FormControl ("",[Validators.required]),
    otp:new FormControl("",[Validators.required]),
    // oldpassword: new FormControl("", [Validators.required]),
    password: new FormControl("", [Validators.required, Validators.minLength(8)]),
    // confirmPassword: new FormControl("", [Validators.required]),
    
    
  
  });
  preventPaste(event: ClipboardEvent): void {
    event.preventDefault();
  }
  confirm2() {
    this.confirmationService.confirm({
        message: 'Are you sure Do you want to logout?',
        header: 'Logout Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
          this.clear()
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
  role: any 
  adminRole: boolean = false;
  sponsorRole: boolean = false;
  isfullscreen = false;
  croRole: boolean= false;
  centralLab: boolean = false;
  siteRole: boolean = false;
  ngOnInit(): void {
  
    this.role = sessionStorage.getItem('role')
    this.fullName =  sessionStorage.getItem('fullName') 
    if(this.role === 'Admin' ||this.role === 'admin' ){
      this.menuItems = [
        // {
          // label: 'Application Admin',
          // icon: 'bx bxs-user-check',
          // expanded: false,
          // subItems: [
            { label: 'Dashboard', link: '/home/cro/dashboards' },
            { label: 'CRO', link: '/home/admin/croGrid' },
            { label: 'User', link: '/home/admin/userGrid' },
            // { label: 'Dashboards', link: '/home/cro/material' }
          // ]
        
        
        // } ,
        // {
        //   label: 'CRO',
        //   icon: 'bx bxs-user-check',
        //   expanded: false,
        //   subItems: [
        //     { label: 'Sponsor', link: '/home/cro/sponsorGrid' },
        //     { label: 'Site', link: '/home/cro/siteGrid' },
        //     { label: 'LabTest', link: '/home/cro/labTestGrid' },
        //     { label: 'Study Summary', link: '/home/cro/protocolGrid' }
        //   ]
        // },
       
        // {
        //   label: 'CRA',
        //   icon: 'bx bxs-analyse',
        //   expanded: false,
        //   subItems: [
        //     // { label: 'Sample Collection', link: '/home/site/viewCRA' }
        //     { label: 'Sample Collection', link: '/home/site/sampleCollection' }
        //   ]
        // }
        
       
     
        // Other menu items for admin role...
      ];
    }
    else if(this.role === 'Sponsor'){
      this.menuItems = [
        // {
          // label: 'CRO',
          // icon: 'bx bxs-user-check',
          // expanded: false,
          // subItems: [
            { label: 'Dashboard', link: '/home/cro/dashboards' },
            { label: 'Sponsor', link: '/home/Sponsor/sponsorStudies' },
        
          // ]
        // },
      
      ];
    }
    else if(this.role === 'CRO'){
      this.menuItems = [
        // {
          // label: 'CRO',
          // icon: 'bx bxs-user-check',
          // expanded: false,
          // subItems: [
         
            { label: 'Dashboard', link: '/home/cro/dashboards' },
            { label: 'Sponsor', link: '/home/cro/sponsorGrid' },
            { label: 'Site', link: '/home/cro/siteGrid' },
            { label: 'LabTest', link: '/home/cro/labTestGrid' },
            { label: 'Lab Creation', link: '/home/cro/labGrid' },
            { label: 'Study Summary', link: '/home/cro/protocolGrid' },
           
            
          // ]
        // },
      
      ];
    }
    else if(this.role === 'Central Lab'){
      this.menuItems = [
        // {
          // label: 'Central Lab',
          // icon: 'bx bxs-analyse',
          // expanded: false,
          // subItems: [
            { label: 'Kit Preparation', link: '/home/centralLab/kitPreprationGrid' },  
               { label: 'Kit Verification', link: '/home/centralLab/kitVerification' },
               { label: 'Kit Distribution', link: '/home/centralLab/kitDistribution' },
            { label: 'Sample Acknowledgement', link: '/home/centralLab/sampleAcknowledgement' },
            { label: 'Sample Reports', link: '/home/centralLab/sampleReports' },
            
          // ]
        // },
        // Other menu items for admin role...
      ];
    }
    else if(this.role === 'Central Lab-Prepration'){
      this.menuItems = [
        { label: 'Dashboard', link: '/home/cro/dashboards' },
        { label: 'Kit Prepration', link: '/home/centralLab/kitPreprationGrid' },
      ];
    }
    else if(this.role === 'Central Lab-Verification'){
      this.menuItems = [
        { label: 'Dashboard', link: '/home/cro/dashboards' },
        { label: 'Kit Verification', link: '/home/centralLab/kitVerification' },
      ];
    }
    else if(this.role === 'Central Lab-Distribution'){
      this.menuItems = [
        { label: 'Dashboard', link: '/home/cro/dashboards' },
        { label: 'Kit Distribution', link: '/home/centralLab/kitDistribution' },
      ];
    }
    else if(this.role === 'Central Lab-Acknowledgement'){
      this.menuItems = [
        { label: 'Dashboard', link: '/home/cro/dashboards' },
        { label: 'Sample Acknowledgement', link: '/home/centralLab/sampleAcknowledgement' },
      ];
    }
    else if(this.role === 'Central Lab-Reports'){
      this.menuItems = [
        { label: 'Dashboard', link: '/home/cro/dashboards' },
        { label: 'Sample Reports', link: '/home/centralLab/sampleReports' },
      ];
    }
    else if(this.role === 'CRA'){
      this.menuItems = [
        // {
          // label: 'CRA',
          // icon: 'bx bxs-analyse',
          // expanded: false,
          // subItems: [
            { label: 'Dashboard', link: '/home/cro/dashboards' },
            { label: 'Sample Collection', link: '/home/site/viewCRA' }
            // { label: 'Sample Collection', link: '/home/site/sampleCollection' }
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
  openfullscreen() {
    const docElmWithBrowsersFullScreenFunctions = document.documentElement as HTMLElement & {
      mozRequestFullScreen(): Promise<void>;
      webkitRequestFullscreen(): Promise<void>;
      msRequestFullscreen(): Promise<void>;
    };
    if (!this.isfullscreen) {
      if (docElmWithBrowsersFullScreenFunctions.requestFullscreen) {
        docElmWithBrowsersFullScreenFunctions.requestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen) { /* Firefox */
        docElmWithBrowsersFullScreenFunctions.mozRequestFullScreen();
      } else if (docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        docElmWithBrowsersFullScreenFunctions.webkitRequestFullscreen();
      } else if (docElmWithBrowsersFullScreenFunctions.msRequestFullscreen) { /* IE/Edge */
        docElmWithBrowsersFullScreenFunctions.msRequestFullscreen();
      }
      this.isfullscreen = true;
    } else {
      const docWithBrowsersExitFunctions = document as Document & {
        mozCancelFullScreen(): Promise<void>;
        webkitExitFullscreen(): Promise<void>;
        msExitFullscreen(): Promise<void>;
      };
      if (docWithBrowsersExitFunctions.exitFullscreen) {
        docWithBrowsersExitFunctions.exitFullscreen();
      } else if (docWithBrowsersExitFunctions.mozCancelFullScreen) { /* Firefox */
        docWithBrowsersExitFunctions.mozCancelFullScreen();
      } else if (docWithBrowsersExitFunctions.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        docWithBrowsersExitFunctions.webkitExitFullscreen();
      } else if (docWithBrowsersExitFunctions.msExitFullscreen) { /* IE/Edge */
        docWithBrowsersExitFunctions.msExitFullscreen();
      }
      this.isfullscreen = false;

    }


  

  }

  showLogout:boolean=false;
  toggleLogout(){
    this.showLogout=!this.showLogout
  }
  first_name:any;
  last_name:any;
  email:any;
  profile(event:Event){
    event.preventDefault();
    if (!this.addprofile) { // Only allow if addprofile is false
      this.addprofile = true;

      this.first_name= sessionStorage.getItem('firstName')
      this.last_name= sessionStorage.getItem('lastName')
      this.email = sessionStorage.getItem('email')
      this.role = sessionStorage.getItem('role')
    }
  }
  emailvaluef:any
  set() {
    this.passwordvisible=true
    this.emailvaluef = this.updatepasswordForm.controls['email'].value.toLowerCase();
    const obj = {
      username: this.emailvaluef,
      clear_session: 'false',
      password: '',
      otp: ''

    }
    this.admin.otp(obj).subscribe(
      (data: any) => {
        this.messageService.add({severity:'success', summary:'Success Message', detail:'OTP sent to your Email'});
       
        // this.route.navigate(['/home'])
      },
      (err: any) => {
        this.passwordvisible=false
        this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});

      }
    ),
      this.admin['set'](obj).subscribe(
        (data: any) => {
          this.passwordvisible=true

          // this.route.navigate(['/home'])
        },
        (err: any) => {
          this.passwordvisible=false
          this.messageService.add({severity:'error', summary:'Error Message', detail:err.error.message});
        }
      )

  }

  reset(){
    this.passwordvisible=true

 const obj ={
  email: sessionStorage.getItem('email'),
  password: this.updatepasswordForm.controls['password'].value,
  otp:this.updatepasswordForm.controls['otp'].value,
  is_forgot: false
  
 }
 

    // alert('Profile created Successfully')
    //           this.route.navigate(['/login'])
              if (this.updatepasswordForm.controls['password'].value === '' || this.updatepasswordForm.controls['password'].value === undefined) {
                // alert('Please Enter Password')
                this.messageService.add({severity:'warn', summary:'Warning Message', detail:'Please Enter Password'});
              }
              // else if (this.updatepasswordForm.controls['confirmPassword'].value === undefined || this.updatepasswordForm.controls['confirmPassword'].value === '') {
              //   // alert('Please Enter Confirm Password')
              //   this.messageService.add({severity:'warn', summary:'Warning Message', detail:'Error occurred while resetting password'});
              // }
              else {
          
                this.admin.reset(obj).subscribe(
                  (data: any) => {
                    this.messageService.add({severity:'success', summary:'Success Message', detail:'Password Reset Successfully'});
          
                    console.log(data);
                    this.updatepassword = false
                    this.passwordvisible=false
                    this.myModal.hide();
                    
                  },
                  (err: any) => {
                    console.log(err); // Log the specific error message to the console
                    this.updatepassword = false

                    this.messageService.add({severity:'error', summary:'Error Message', detail:'Error occurred while resetting password'});
                  }
                );
                ;
          
              }
          
            }
            updaten(){
              // this.log=true
              this.confirm2()
              // this.updatepasswordForm.controls['email'].setValue(sessionStorage.getItem('email'))
            }
 
  update(){
    this.updatepassword=true
    this.updatepasswordForm.controls['email'].setValue(sessionStorage.getItem('email'))
  }
  validateOTP(input: any, OTP: any) {
    let inputValue = input.value.trim();
    
    // Remove non-numeric characters
    let numericValue = inputValue.replace(/\D/g, '');

    if(OTP ==='otp'){
    if (numericValue.length > 6) {
        numericValue = numericValue.slice(0, 6);
    }
  }
  input.value = numericValue;
}
  clear(){
    
    sessionStorage.clear()
    this.router.navigate(['/login'])
  }
  sidebarToggle!: HTMLElement;
  sidebar!: HTMLElement;
  isSidebarShrunk: boolean;


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