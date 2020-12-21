import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
   public isUserLoggedIn: Subject<any> = new Subject();
  UserData: any;  
  constructor(public router: Router) { }

  getLoginStatus() {
    
    return this.isUserLoggedIn.asObservable();
  }

  setLoginStatus(status: any)
  {
    
    this.isUserLoggedIn.next(status);
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    {
      if(this.isLoggedIn())
      { 
        return true;
      }
      else
      {
        this.router.navigate(['/login']);
        return false;
      }
    }
  }
  
  isLoggedIn()
  {
    return (sessionStorage.getItem("isLoggedIn") == "1");
  }

  Login(){
    sessionStorage.setItem("isLoggedIn", "1");
  }

  Logout(){
    sessionStorage.setItem("isLoggedIn", "0");
  }
}
