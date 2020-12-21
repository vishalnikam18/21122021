import { Component, OnInit, OnDestroy,OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navbarOpen = false;
  isLogin :boolean = sessionStorage.getItem("isLoggedIn")?true : false;

  constructor(private router : Router,
    private authService : AuthServiceService) 
    {
      

    }

  ngOnInit(): void 
  {
    this.authService.getLoginStatus().subscribe(value =>{
      console.log(value);
      this.isLogin = value;
    })
  }
  
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
 
  logout(){
    delete sessionStorage['token'];
    delete sessionStorage['isLoggedIn'];
    this.authService.setLoginStatus(false);
    this.router.navigate(['/home']);
}
}