import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessagesRoutingModule } from './messages-routing.module';
import { NewMessageComponent } from './new-message/new-message.component';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ReceivedMessagesComponent } from './received-messages/received-messages.component';


@NgModule({
  declarations: [
    NewMessageComponent,
    ReceivedMessagesComponent
  ],
  imports: [
    CommonModule,
    MessagesRoutingModule,
    AppMaterialModule
  ]
})
export class MessagesModule { }
