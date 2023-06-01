import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  role: any 
  adminRole: boolean = false;
  sponsorRole: boolean = false;
  croRole: boolean= false;
  centralLab: boolean = false;
  siteRole: boolean = false;
  ngOnInit(): void {
    this.role = sessionStorage.getItem('role')
    if(this.role === 'admin'){
      this.adminRole = true;
      this.sponsorRole = true;
      this.croRole = true;
      this.centralLab = true;
      this.siteRole = true;
    }
    else if(this.role === 'Sponsor'){
      this.adminRole = false;
      this.sponsorRole = true;
      this.croRole = false;
      this.centralLab = false;
      this.siteRole = false;
    }
    else if(this.role === 'CRO'){
      this.adminRole = false;
      this.sponsorRole = false;
      this.croRole = true;
      this.centralLab = false;
      this.siteRole = false;
    }
    else if(this.role === 'Central Lab'){
      this.adminRole = false;
      this.sponsorRole = false;
      this.croRole = false;
      this.centralLab = true;
      this.siteRole = false;
    }
    else if(this.role === 'Site'){
      this.adminRole = false;
      this.sponsorRole = false;
      this.croRole = false;
      this.centralLab = false;
      this.siteRole = true;
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
}

  

