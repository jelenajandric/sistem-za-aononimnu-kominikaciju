import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/authentication/services/login.service';
import { SegmentService } from './segment.service';
import { ActiveUsers } from 'src/app/model/active-users.model';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  public activeUsers: ActiveUsers | any;

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private segmentService: SegmentService) { }

  public getActiveUsers() : Observable<Array<ActiveUsers>> {
    return this.http.get<Array<ActiveUsers>>("https://localhost:8443/users/find-all-active");
  }

  private getServerPorts() : Observable<Array<Int32Array>> {
    return this.http.get<Array<Int32Array>>("https://localhost:8443/servers");
  }

  public prepareMessage(text: string, receiver: string, key: string) {
    var segmentsForSending = this.segmentService.makeEncryptedSegmentsOfMessage(text, this.getIdForUser(receiver), this.getPublicKeyForUser(receiver), key);
    var ports = new Array<Int32Array>();

    this.getServerPorts().subscribe(data => {
      ports = data;
      var i = 0;

      segmentsForSending.forEach(element => {
        this.sendSegment(element, ports[i%ports.length]).subscribe();
        i++;
      });
    })
  }

  private sendSegment(segment: String, port: Int32Array) : Observable<any> {
    const headers = {'content-type':'application/json'}
    return this.http.post("https://localhost:" + port + "/message-segments", segment, {headers:headers} );
  }

  private getPublicKeyForUser(username: string) : any {
    var retVal = null;
    
    this.activeUsers.forEach((element: { username: string; publicKey: any; })  => {
      if(element.username===username) {
        retVal = element.publicKey;
      }
    });
    return retVal
  }

  getIdForUser(username: string) : any {
    var retVal = null;
    
    this.activeUsers.forEach((element: { username: string; id: any; })  => {
      if(element.username===username) {
        retVal = element.id;
      }
    });
    return retVal
  }

}
