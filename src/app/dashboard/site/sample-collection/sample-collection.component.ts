import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProtocolService } from 'src/app/Services/CRO-PROTOCOL/protocol.service';
import { protocol } from 'src/app/const.ts/protocol';

@Component({
  selector: 'app-sample-collection',
  templateUrl: './sample-collection.component.html',
  styleUrls: ['./sample-collection.component.css']
})
export class SampleCollectionComponent {
  selectedOption!: string;
  public protocol_id: any = [];
  public KitType: any = '';
  public protocols: protocol[]=[];
  constructor(private _protocolService:ProtocolService,private_router:Router){
    this._protocolService.getProtocols().subscribe(
      (data:protocol[])=>{
        this.protocols=data;
      },
      (err:any)=>{
        alert('internal server error');
      }
    )
  }
}
