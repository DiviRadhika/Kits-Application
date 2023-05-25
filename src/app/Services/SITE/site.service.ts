import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteService {

  constructor(private _httpClient:HttpClient) { }
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
}
