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
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationadminModule } from './applicationadmin/applicationadmin.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './token-interceptor.service';
import { NgxPaginationModule } from 'ngx-pagination';


import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UploadResultsComponent,
    HeaderComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CROModule,
    SponsorModule,
    // CentralLabModule,
    // SiteModule,
    ReactiveFormsModule,
    ApplicationadminModule,
    FormsModule,
    NgxPaginationModule,
   HttpClientModule,

  ],
  // {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService, multi:true}
  providers: [],
  bootstrap: [AppComponent,]
})
export class AppModule { }
