import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReceiveMessageService } from '../services/receive-message.service';
import { Message } from 'src/app/model/message.model';

@Component({
  selector: 'app-received-messages',
  templateUrl: './received-messages.component.html',
  styleUrls: ['./received-messages.component.css']
})
export class ReceivedMessagesComponent implements OnInit, OnDestroy {

  public messages: Array<Message> = new Array<Message>();
  private interval : any

  constructor(private receiveMessageService: ReceiveMessageService) {

  }

  ngOnInit(): void {
    this.interval = setInterval(() => {
      this.askForNewMessages();
    }, 10000);
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  askForNewMessages() {
    this.receiveMessageService.getMessagesForMe();
    this.messages = this.receiveMessageService.resultMessages;
  }
}
