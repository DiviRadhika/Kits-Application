import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ApplicationadminRoutingModule } from './applicationadmin/applicationadmin-routing.module';
import { ApplicationadminModule } from './applicationadmin/applicationadmin.module';
import { CROModule } from './cro/cro.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { HomeComponent } from './home/home.component';
import { UploadResultsComponent } from './central/upload-results/upload-results.component';
import { CentralLabModule } from './central-lab/central-lab.module';
import { SiteModule } from './site/site.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadResultsComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ApplicationadminModule,
    CROModule,
    SponsorModule,
    CentralLabModule,SiteModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
