import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LoginServicesService {
  logindetails : any;
  constructor(private _http: HttpClient) { }

  getLoginDetails()
  {
    console.log(JSON.parse(JSON.stringify(this.logindetails)));
    return this.logindetails;
  }

  loginUser(loginDetails : any ):Observable<any[]>
  {
    
  this.logindetails =   this._http.post<any[]>("http://localhost:8080/api/user/login",loginDetails);
    return this.logindetails;
  }


  getuserDetails()
  {
    
    var gettoken : any = sessionStorage.getItem('token');
    var sendToken = JSON.parse(gettoken);
    // console.log("Token Sended "+sendToken.token);
    // console.log(" link =http://localhost:8080/api/user/userData");
   return this._http.get("http://localhost:8080/api/user/userData",{
      observe : 'body',
      params : new HttpParams().append('token', sendToken.token)
    });
    // return this.logindetails;
  }
  updatePassword(passwordChange : any)
  {
    return this._http.post("http://localhost:8080/api/user/password",passwordChange);
  }
}
