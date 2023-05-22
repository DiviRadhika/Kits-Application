import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProtocolService {

  constructor(private _httpClient:HttpClient) { }
  getProtocols():Observable<any>{
    return this._httpClient.get<any>("http://34.100.227.119:5001/api/cro_protocols");
  }
  CreateProtocolDetails(data:any):Observable<any>{
    return this._httpClient.post("http://34.100.227.119:5001/api/cro_protocol",data);
  }
  getProtocolDetails(id:any):Observable<any>{
    return this._httpClient.get("http://34.100.227.119:5001/api/cro_protocols"+id);
  }
  updateProtocolDetails(data:any,id:any):Observable<any>{
    return this._httpClient.put("http://34.100.227.119:5001/api/cro_protocol/"+id,data)
  }
}
