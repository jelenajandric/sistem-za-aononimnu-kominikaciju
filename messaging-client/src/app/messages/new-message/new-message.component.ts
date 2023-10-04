import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../services/message.service';
import { LoginService } from 'src/app/authentication/services/login.service';
import { Router } from '@angular/router';
import { ActiveUsers } from 'src/app/model/active-users.model';

@Component({
  selector: 'app-new-message',
  templateUrl: './new-message.component.html',
  styleUrls: ['./new-message.component.css']
})
export class NewMessageComponent implements OnInit, OnDestroy {

  public form: FormGroup = new FormGroup({})
  public activeUsers : Array<string> = new Array<string>();
  private interval : any;

  constructor(private messageService: MessageService, 
    private loginService: LoginService,
    private router: Router) {
      this.form = new FormGroup({    
        receiver: new FormControl(''),
        text: new FormControl(''),
        key : new FormControl('')
      })
    }
  
  ngOnInit(): void {
    if(this.loginService.isLoggedIn()===false) {
      this.router.navigate(['/users/login']);
    } else {
      this.getActiveUsers();
      this.interval = setInterval(() => {
        this.getActiveUsers();
      }, 10000); 
    }
  }

  public getUsername() {
    return this.loginService.getUsername();
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  sendMessage() {
    if(this.form.value.receiver && this.form.value.text && this.form.value.key) {
      this.messageService.prepareMessage(this.form.value.text, this.form.value.receiver, this.form.value.key)
      this.form.reset();
    } else {
      this.error = "Morate oznaciti primaoca i upisati tekst poruke i kljuc."
    }
  }

  logout() {
    if (this.interval) {
      clearInterval(this.interval);
    }
    this.loginService.logout().subscribe(data => {
      this.router.navigate(['/users/login'])
    });
  }

  getActiveUsers() {
    this.messageService.getActiveUsers().subscribe(data => {

      if(data!=null) {
        this.activeUsers = new Array<string>();
        this.messageService.activeUsers = data;
        data.forEach(element => {
          if(element.username!=this.loginService.getUsername()) {
            this.activeUsers.push(element.username)
          }
        });
      }
    })
  }

  @Input() error: string | null | undefined

}
