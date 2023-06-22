import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {




  menuItems :any[] = [];

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
    this.role = sessionStorage.getItem('role')
    if(this.role === 'Admin'){
      this.menuItems = [
        {
          label: 'Application Admin',
          icon: 'bx bxs-user-check',
          expanded: false,
          subItems: [
            { label: 'CRO Create', link: '/home/admin/croGrid' },
            { label: 'User Create', link: '/home/admin/userGrid' },
            // { label: 'Dashboards', link: '/home/cro/material' }
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
        {
          label: 'CRO',
          icon: 'bx bxs-user-check',
          expanded: false,
          subItems: [
            { label: 'Sponsor', link: '/home/cro/sponsorGrid' },
            { label: 'Site', link: '/home/cro/siteGrid' },
            { label: 'LabTest', link: '/home/cro/labTestGrid' },
            { label: 'Protocol Summary', link: '/home/cro/protocolView' }
          ]
        },
        // Other menu items for admin role...
      ];
    }
    else if(this.role === 'Central Lab'){
      this.menuItems = [
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
        // Other menu items for admin role...
      ];
    }
    else if(this.role === 'CRA'){
      this.menuItems = [
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
  clear(){
    sessionStorage.clear()
  }
  sidebarToggle!: HTMLElement;
  sidebar!: HTMLElement;
  isSidebarShrunk: boolean;

  constructor() {
    this.isSidebarShrunk = false;
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