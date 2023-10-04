import { HttpClient, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/authentication/services/login.service';
import { Segment } from 'src/app/model/segment.model';
import { SegmentService } from './segment.service';
import { Message } from 'src/app/model/message.model';

@Injectable({
  providedIn: 'root'
})
export class ReceiveMessageService {

  private segmentsStringArray : Array<string> | any;
  public resultMessages : Array<Message> | any;

  constructor(private http: HttpClient,
    private loginService: LoginService,
    private segmentService: SegmentService) { 

      this.segmentsStringArray = new Array<string>();
  }

  getMessagesForMe() {
    this.http.get("https://localhost:8443/messages?id=" + this.loginService.getId()).subscribe(data=> {
      if(data!=null) {
        this.segmentsStringArray = data;
        
        var result = this.segmentService.makeMessageFromSegments(this.segmentsStringArray);
        this.resultMessages = result;
      } 
    })
  }
}
