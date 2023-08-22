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
      postPrepration(data:any):Observable<any>{
        return this.http.post(endPointsUser.postPrepration, data)
    }
    getPrepration(){
        return this.http.get(endPointsUser.getPrepration)
    }
    getPreprationBySId(id1: any){
        return this.http.get(endPointsUser.getPrepration+ '/'+ id1)
    }
    getPreprationBySponsor(id1: any){
        return this.http.get(endPointsUser.croProtocols+ '/'+ id1)
    }
    getPreprationById(id: any): Observable<any> {
        return this.http.get(endPointsUser.getPreprationById + id)
    }
    sampleack(id: any,id1: any): Observable<any> {
        return this.http.get(endPointsUser.sampleack + id + '/'+ id1)
    }
    sampleackput(data:any): Observable<any> {
        return this.http.put(endPointsUser.sampleackput,data )
    }
    updatePreprationById(data: any): Observable<any> {
        return this.http.put(endPointsUser.postPrepration, data)
    }
    
   
 }  