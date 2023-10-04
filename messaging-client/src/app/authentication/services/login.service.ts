import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { LoginRequest } from 'src/app/model/login-request.model';
import { LoginResponse } from 'src/app/model/login-response.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginResponse: LoginResponse | any;

  constructor(private http: HttpClient) { }

  public login(username: string, password: string): Observable<LoginResponse> {
    const headers = {'content-type':'application/json'}
    const body = JSON.stringify(new LoginRequest(username, password))

    return this.http.post<LoginResponse>("https://localhost:8443/users/login",body, {headers:headers} );
  }

  public logout() :Observable<any> {
    this.loginResponse.isLoggedIn = false;
    
    return this.http.get("https://localhost:8443/users/logout?username=" + this.loginResponse.username);
  }

  public isLoggedIn() : boolean {
    if(this.loginResponse!=undefined && this.loginResponse!=null) {
      return this.loginResponse.isLoggedIn; 
    }
    else {
      return false;
    }
  }

  public getUsername() : string {
    if(this.loginResponse!=undefined && this.loginResponse!=null) {
      return this.loginResponse.username;
    } else {
      return "";
    }
  }

  public getPrivateKey() : string {
    if(this.loginResponse!=undefined && this.loginResponse!=null) {
      return this.loginResponse.privateKey;
    } else {
      return "";
    }
  }

  public getId() : number {
    if(this.loginResponse!=undefined && this.loginResponse!=null) {
      return this.loginResponse.id;
    } else {
      return -1;
    }
  }

  public getLoginResponse() : LoginResponse | any {
    return this.loginResponse;
  }

  public setLoginResponse(loginResponse : LoginResponse) {
    this.loginResponse = loginResponse;
  }
}
