import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitPreparationService {

  constructor(private _httpclient:HttpClient) { }
  createKitrepationDetails(data:any):Observable<any>{
    return this._httpclient.post("http://34.100.227.119:5001/api/clab_kit_preparation",data);
  }
  updateKitPreparationDeatils(data:any,id:any):Observable<any>{
    return this._httpclient.put("http://34.100.227.119:5001/api/clab_kit_preparation/"+id,data);
  }
  getKitPreparationDetails(id:any):Observable<any>{
    return this._httpclient.get("http://34.100.227.119:5001/api/clab_kit_preparation")
  }
}
