import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SposorService {

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
  // postDetails(details:any){
  //   return this._httpClient.post(this.apiUrl,details);
  // }
}
