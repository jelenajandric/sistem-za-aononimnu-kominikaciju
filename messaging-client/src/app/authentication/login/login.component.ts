import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form: FormGroup = new FormGroup({})
  hide = true;

  constructor(private loginService: LoginService,
              private router: Router) {}

  ngOnInit(): void {
    this.form = new FormGroup({    
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  public submit() {
    if(!this.form.valid) {
      this.error="Popunite sva polja vazecim vrijednostima"
    } else {
      this.loginService.login(this.form.value.username, this.form.value.password).subscribe(data => {
        if(data!=null) {
          if(data.isLoggedIn) {
            this.loginService.setLoginResponse(data);
            this.router.navigate(["/messages"])
          } else {
            this.error = "Nepravilan unos!"
          }
        } else {
          this.error = "Nepravilan unos!"
        }
      })
    }
          
  }

  @Input() error: string | null | undefined

}
