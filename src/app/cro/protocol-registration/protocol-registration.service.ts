import { Injectable } from '@angular/core'; 
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { LSponsers } from './lsponsers';
import { LabTests } from './lab-tests';
import { CROS } from './cros';
import { Protocol } from './protocol';
import { Sites } from './sites';
import { Observable } from 'rxjs';

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
    getSponsers(){
        return  this.http.get("http://34.100.227.119:5001/api/sponsors");
    }

    getLabTests(){
        return this.http.get("http://34.100.227.119:5001/api/lab_tests");
    }

    getCros(){
        return this.http.get("http://34.100.227.119:5001/api/cros");
    }

    getSites(){
        return this.http.get("http://34.100.227.119:5001/api/sites_data");
    }

    postProtocol(data:any):Observable<any>{
        return this.http.post<Protocol>("http://34.100.227.119:5001/api/cro_protocol",data);
    }
 }  