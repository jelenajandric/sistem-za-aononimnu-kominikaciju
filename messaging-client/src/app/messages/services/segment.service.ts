import { Injectable } from '@angular/core';
import { min } from 'rxjs';
import { LoginService } from 'src/app/authentication/services/login.service';
import { Message } from 'src/app/model/message.model';
import { Segment } from 'src/app/model/segment.model';
import { EncriptionService } from './encription.service';

@Injectable({
  providedIn: 'root'
})
export class SegmentService {
  private messages: Array<Message>;
  protected segments : Array<Segment>;

  constructor(private loginService: LoginService,
    private encriptionService: EncriptionService) {
    this.messages = new Array<Message>();
    this.segments = new Array<Segment>();
   }

  public makeEncryptedSegmentsOfMessage(text: String, receiverId: number, receiversPublicKey: string, encryptionKey: string) : Array<string> {
    var randomNumOfSegments = this.randomIntFromInterval(3, text.length)
    var messageId = this.randomIntFromInterval(1, 10000)

    var segmentSize;
    segmentSize = Math.floor(text.length / randomNumOfSegments);

    var start = 0;
    var segmentsForSending = new Array<string>();
    var i = 0;
    while (start < text.length) {
      var segment = "";
      if(i===randomNumOfSegments-1) {
        segment = text.substring(start, text.length) + "#" + this.loginService.getUsername() + "#" + i + "#" + randomNumOfSegments + "#" + messageId;
        start = text.length;
      } else {
        segment = text.substring(start, start+segmentSize) + "#" + this.loginService.getUsername() + "#" + i + "#" + randomNumOfSegments + "#" + messageId;
      }

      var encryptedSergment = this.encriptionService.encryptWithSymmetricKey(encryptionKey, segment);
      segmentsForSending.push(receiverId + "#" + encryptedSergment)

      start += segmentSize;
      i++;
      
    }
    var encryptedSymmetricKey = this.encriptionService.encryptSymmetricKeyWithPublicKey(encryptionKey, receiversPublicKey);
    segmentsForSending.push(receiverId + "#key%" + encryptedSymmetricKey)

    return segmentsForSending;
  } 

  public makeMessageFromSegments(segmentsStringArray: Array<string>) : Array<Message> | any {
    var encryptedSymmetricKeyForDecription = "";
    var symmetricKeyForDecription = "";

    segmentsStringArray.forEach(element => {

      if(element.split("%")[0] === "key") {

        encryptedSymmetricKeyForDecription = element.split("%")[1];
        symmetricKeyForDecription = this.encriptionService.decryptSymmetricKeyWithMyPrivateKey(encryptedSymmetricKeyForDecription, this.loginService.getLoginResponse().privateKey)
      }
    });

    segmentsStringArray.forEach(encryptedElement => {
      if(encryptedElement.split("%")[0] != "key") {

        var element = this.encriptionService.decryptWithSymmetricKey(symmetricKeyForDecription, encryptedElement);
        this.segments.push(new Segment(element.split("#")[0], element.split("#")[1], Number(element.split("#")[2]), 
          Number(element.split("#")[3]), Number(element.split("#")[4])));
      }
    });

    this.segments.sort((a:Segment, b:Segment) : number => {
      return this.sortSegments(a,b);
    });

    const arrayUniqueByKey = [...new Map(this.segments.map(item =>
      [item.messageId, item.messageId])).values()];

    var segmentsWithSpecificMessageId = new Array<Segment>();
    arrayUniqueByKey.forEach(element => {
      segmentsWithSpecificMessageId = this.segments.filter(el => el.messageId===element)

      if(segmentsWithSpecificMessageId.length == segmentsWithSpecificMessageId[0].numOfSegments) {
        var messageText = "";
        var sender = segmentsWithSpecificMessageId[0].sender
        segmentsWithSpecificMessageId.forEach(element => {
          messageText += element.text;
        });
        this.messages.push(new Message(segmentsWithSpecificMessageId[0].messageId, messageText, sender));
      }
      this.segments = this.segments.filter(seg => seg.messageId != segmentsWithSpecificMessageId[0].messageId)
    });
    return this.messages;
  }

  private randomIntFromInterval(min: number, max: number) : number {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  private sortSegments(a:Segment, b:Segment) : number {
    if(a.messageId===b.messageId && a.serialNumber > b.serialNumber) {
      return 1;
    }
    else if(a.messageId===b.messageId && a.serialNumber < b.serialNumber) {
      return -1;
    }
    else if(a.messageId!==b.messageId) {
      return 1;
    } else {
      return 0;
    }
  }
  
}
