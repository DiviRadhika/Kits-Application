import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private _httpClient:HttpClient) { }

  // Services for cro
  getCro():Observable<any>{
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/cros");
  }
  getCrobyId(id:any):Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/cro/" + id);
  }
  CreateCroDetails(data:string):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/cro",data);
  }
  updateCroDetaild(data:[]):Observable<any>{
    return this._httpClient.put("http://34.100.227.119:5001/api/cro",data);
  }

 // Services for USer
  getUser():Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/user/register");
  }
  getUserbyId(id:any):Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/user_actions/" + id);
  }
  createUser(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/user/register", data);
  }
  updateUser(data:[]):Observable<any>{
    return this._httpClient.put("http://34.100.227.119:5001/api/user/register", data);
  }

 // Login Services
  login(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/login", data);
  }
  otp(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/login/sendotp", data);
  }
}
