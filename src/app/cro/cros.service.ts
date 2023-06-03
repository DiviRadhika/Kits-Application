import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endPointsUser } from '../api';

@Injectable({
  providedIn: 'root'
})
export class CrosService {
  constructor(private _httpClient: HttpClient) { }

  // Services for Sponsors
  getsponsors(): Observable<any> {
    return this._httpClient.get(endPointsUser.getSponsors)
  }
  getSponsorById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getSponsorsById)
  }
  CreateSponsorDetails(data: any): Observable<any> {
    return this._httpClient.post(endPointsUser.getSponsorsAddUpdate, data)
  }

  updateSponsorDetails(data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.getSponsorsAddUpdate, data)
  }

  // Services for Sites
  getSites(): Observable<any> {
    return this._httpClient.get(endPointsUser.getSites)
  }
  getSiteById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getSiteById)
  }
  CreateSiteDetails(data: string): Observable<any> {
    return this._httpClient.post(endPointsUser.getSiteAddUpdate, data)
  }

  updateSiteDetails(data: []): Observable<any> {
    return this._httpClient.put(endPointsUser.getSiteAddUpdate, data)
  }

  // Services for Lab Test
  getLabTests(): Observable<any> {
    return this._httpClient.get(endPointsUser.getLabTest)
  }
  getTestDetailsById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getLabTestById)
  }
  createTestDetails(data: any): Observable<any> {

    return this._httpClient.post(endPointsUser.getLabTestAddUpdate, data)
  }
  updateTestDetails(data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.getLabTestAddUpdate, data)
  }
  
  
}

