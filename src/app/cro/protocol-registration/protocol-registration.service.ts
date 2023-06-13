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

   /* sponsers: LSponsers[] | undefined;
  crosList: CROS[]  | undefined;
  protocolList: Protocol[] | undefined ;
  labTestsList: LabTests[] | undefined ;*/
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
 }  