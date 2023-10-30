import { Injectable } from '@angular/core'; 
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { LSponsers } from './lsponsers';
import { LabTests } from './lab-tests';
import { CROS } from './cros';
import { Protocol } from './protocol';
import { Sites } from './sites';
import { Observable } from 'rxjs';
import { endPointsUser } from 'src/app/api';

@Injectable(
    { providedIn: 'root', }
    )
export class ProtocolService { 
    constructor(private http:HttpClient) { }

   
  protocolList: Protocol[] =[];

    postProtocol(data:any):Observable<any>{
        return this.http.post(endPointsUser.postProtocol, data)
    }
    getProtocol(){
        return this.http.get(endPointsUser.croProtocols)
    }
    getProtocolId(id: any): Observable<any> {
        return this.http.get(endPointsUser.getProtocolId + id)
      }

      kitsns(id: any): Observable<any> {
        return this.http.get(endPointsUser.kitsns + id )
      }

    kitsnsfk(id: any, payload: { kit_type: any, from_date: any, to_date: any }): Observable<any> {
     
      const url = `${endPointsUser.kitsns}/${id}?kit_type=${payload.kit_type}&from_date=${payload.from_date}&to_date=${payload.to_date}`;
      return this.http.get(url);
    }
  
      kitsnsv(id:any, site:any):Observable<any>{
        return this.http.get(endPointsUser.kitsnsv + id + '/'+ site )
      }
      kitsnsvf(id:any, site:any, type:any, fromdate:any, todate:any, age:any, gender:any, patient:any):Observable<any>{
        return this.http.get(endPointsUser.kitsnsv + id + '/'+ site + '/'+ type + '/'+ fromdate + '/'+ todate + age + '/'+ gender + '/'+ patient)
      }
      kitsnsvfk(id: any, site: any, payload: { kit_type: any,  from_date: any, to_date: any, age: any, gender: any, patient_id: any}): Observable<any> {
        const url = `${endPointsUser.kitsnsv}/${id}/${site}?kit_type=${payload.kit_type}&from_date=${payload.from_date}&to_date=${payload.to_date}&age=${payload.age}&gender=${payload.gender}&patient_id=${payload.patient_id}`;
        return this.http.get(url);
      }
      postPreparation(data:any):Observable<any>{
        return this.http.post(endPointsUser.postPreparation, data)
    }
    getPreparation(){
        return this.http.get(endPointsUser.getPreparation)
    }
    getPreparationBySId(id1: any){
        return this.http.get(endPointsUser.getPreparation+ '/'+ id1)
    }
    getPreparationBySponsor(id1: any){
        return this.http.get(endPointsUser.croProtocols+ '/'+ id1)
    }
    getPreparationById(id: any): Observable<any> {
        return this.http.get(endPointsUser.getPreparationById + id)
    }
    sampleack(id: any,id1: any): Observable<any> {
        return this.http.get(endPointsUser.sampleack + id + '/'+ id1)
    }
    sampleackput(data:any): Observable<any> {
        return this.http.put(endPointsUser.sampleackput,data )
    }
    updatePreparationById(data: any): Observable<any> {
        return this.http.put(endPointsUser.postPreparation, data)
    }
    
   
 }  