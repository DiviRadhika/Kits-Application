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
    return this._httpClient.get(endPointsUser.getSponsorsById + id)
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
    return this._httpClient.get(endPointsUser.getSiteById + id)
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
    return this._httpClient.get(endPointsUser.getLabTestById  + id)
  }
  createTestDetails(data: any): Observable<any> {

    return this._httpClient.post(endPointsUser.getLabTestAddUpdate, data)
  }
  updateTestDetails(data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.getLabTestAddUpdate, data)
  }
  deleteLab(id: any): Observable<any> {
    return this._httpClient.delete(endPointsUser.getLabTestById  + id)
  }

  // Services for meterials
  meterials(): Observable<any> {
    return this._httpClient.get(endPointsUser.meterials)
  }
  createMaterialDetails(data: any): Observable<any> {
    return this._httpClient.post(endPointsUser.materialAddUpdate, data)
  }
  updateMaterialDetails(id:any,data: any): Observable<any> {
    return this._httpClient.put(endPointsUser.materialAddUpdate + '/' +id, data)
  }
  getmeterialById(id: any): Observable<any> {
    return this._httpClient.get(endPointsUser.getmeterialById +id)
  }
  
}

