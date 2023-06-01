import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrosService {
  constructor(private _httpClient: HttpClient) { }

  // Services for Sponsors
  getsponsors(): Observable<any> {
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/sponsors")
  }
  CreateSponsorDetails(data: any): Observable<any> {
    return this._httpClient.post("http://34.100.227.119:5001/api/sponsor", data);
  }
  getSponsorById(id: any): Observable<any> {
    return this._httpClient.get("http://34.100.227.119:5001/api/sponsor/" + id);
  }
  updateSponsorDetails(data:any): Observable<any> {
    return this._httpClient.put("http://34.100.227.119:5001/api/sponsor", data);
  }

  // Services for Sites
  getSites(): Observable<any> {
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/sites_data");
  }
  CreateSiteDetails(data: string): Observable<any> {
    return this._httpClient.post("http://34.100.227.119:5001/api/site_data", data);
  }
  getSiteById(id: any): Observable<any> {
    return this._httpClient.get("http://34.100.227.119:5001/api/site_data/" + id);
  }
  updateSiteDetails(data: []): Observable<any> {
    return this._httpClient.put("http://34.100.227.119:5001/api/site_data" ,data);
  }


  // Services for Lab Test
  createTestDetails(data: any): Observable<any> {
    return this._httpClient.post("http://34.100.227.119:5001/api/lab_test", data);
  }
  updateTestDetails(data:any): Observable<any> {
    return this._httpClient.put("http://34.100.227.119:5001/api/lab_test", data);
  }
  getTestDetailsById(id: any): Observable<any> {
    return this._httpClient.get("http://34.100.227.119:5001/api/lab_test/" + id);
  }
  getLabTests(): Observable<any> {
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/lab_tests");
  }
}

