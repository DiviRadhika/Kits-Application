import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LabTestService {

  constructor(private _httpclient:HttpClient) { }
  createTestDetails(data:any):Observable<any>{
    return this._httpclient.post("http://34.100.227.119:5001/api/lab_test",data);
  }
  updateTestDetails(data:any,id:any):Observable<any>{
    return this._httpclient.put("http://34.100.227.119:5001/api/lab_test/"+id,data);
  }
  getTestDetails(id:any):Observable<any>{
    return this._httpclient.get("http://34.100.227.119:5001/api/lab_tests"+id);
  }
  getLabTests():Observable<any>{
    return this._httpclient.get<any>("http://34.100.227.119:5001/api/lab_tests");
  }
}
