import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isLogin : boolean = false ;
  title = 'BestifyYourTime';
  loginValue()
  {
    this.isLogin = true;
  }
}
