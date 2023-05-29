import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _httpClient:HttpClient) { }
  getCro():Observable<any>{
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/cros");
  }
  getCroDeatils(id:any):Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/cros"+id);
  }
  CreateCroDetails(data:string):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/cro",data);
  }
  updateCroDetaild(data:any,id:any):Observable<any>{
    return this._httpClient.put("http://34.100.227.119:5001/api/cro/"+id,data);
  }
  getUser():Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/user/register");
  }
  createUser(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/user/register", data);
  }
  login(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/login", data);
  }
  otp(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/login/sendotp", data);
  }
}
