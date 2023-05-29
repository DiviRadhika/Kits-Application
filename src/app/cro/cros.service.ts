import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrosService {
  constructor(private _httpClient:HttpClient) { }
  getsponsors():Observable<any>{
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/sponsors")
  }
  CreateSponsorDetails(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/sponsor",data);
  }
  getSponsorDetails(id:any):Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/sponsors"+id);
  }
  updateSponsorDetails(data:any,id:any):Observable<any>{
    return this._httpClient.put("http://34.100.227.119:5001/api/sponsor/"+id,data);
  }
  getSites():Observable<any>{
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/sites_data");
  }
  CreateSiteDetails(data:string):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/site_data",data);
  }
  getSiteDetails(id:any):Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/site_data"+id);
  }
  updateSiteDetails(data:any,id:any):Observable<any>{
    return this._httpClient.put("http://34.100.227.119:5001/api/site_data/"+id,data);
  }

  createTestDetails(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/lab_test",data);
  }
  updateTestDetails(data:any,id:any):Observable<any>{
    return this._httpClient.put("http://34.100.227.119:5001/api/lab_test/"+id,data);
  }
  getTestDetails(id:any):Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/lab_tests"+id);
  }
  getLabTests():Observable<any>{
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/lab_tests");
  }
}

