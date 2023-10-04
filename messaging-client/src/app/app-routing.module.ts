import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./authentication/authentication.module').then(mod => mod.AuthenticationModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./messages/messages.module').then(mod => mod.MessagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
