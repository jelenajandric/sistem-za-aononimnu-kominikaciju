import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewMessageComponent } from './new-message/new-message.component';

const routes: Routes = [
  {
    path: '',
    component: NewMessageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessagesRoutingModule { }
