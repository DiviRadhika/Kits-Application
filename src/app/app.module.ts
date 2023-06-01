import { ApplicationModule, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { CROModule } from './cro/cro.module';
import { SponsorModule } from './sponsor/sponsor.module';
import { HomeComponent } from './home/home.component';
import { UploadResultsComponent } from './central/upload-results/upload-results.component';
import { CentralLabModule } from './central-lab/central-lab.module';
import { SiteModule } from './site/site.module';
import { ProtocolRegistrationComponent } from './protocol-registration/protocol-registration.component';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationadminModule } from './applicationadmin/applicationadmin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadResultsComponent,
    ProtocolRegistrationComponent
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CROModule,
    SponsorModule,
    CentralLabModule,SiteModule,
    ReactiveFormsModule,
    ApplicationadminModule,
    FormsModule
  ],
  
  providers: [{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
