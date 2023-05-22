import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CroService {

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
}
