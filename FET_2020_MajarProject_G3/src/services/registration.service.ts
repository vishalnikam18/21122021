import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const httpOptionsPlain = {
  headers: new HttpHeaders({
    'Accept': 'text/plain',
    'Content-Type': 'text/plain'
  }),
  'responseType': 'text'
};

@Injectable({
  providedIn: 'root'
})
export class RegistrationService 
{
  url : string  = "http://localhost:8080/api/user/";
  constructor(private _http : HttpClient) { }
  signup(regObject  : any) : Observable<any[]>
  {

    return this._http.post<any[]>(this.url,regObject);
  
  }
  checkEmail(mailId : any)
  {
    console.log("Service value of mail "+mailId)
    return this._http.get<any[]>(this.url+"emailCheck/"+mailId);
  }
}
