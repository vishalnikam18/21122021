import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/user';
import { LoginServicesService } from 'src/app/login-services.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthServiceService } from '../../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  login: boolean = true;
  loginForm: any;
  title: string = "Login Here";
  model: any;
  userData: any;
  msg = "";
  constructor(private fb: FormBuilder,
    private loginService: LoginServicesService,
    private router: Router,
    private auth: AuthServiceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.createForm();

  }
  createForm() {
    this.loginForm = this.fb.group({
      password: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    })
  }

  get validForm() { return this.loginForm.controls }
  signIn() {
    if (this.loginForm.valid) {
      this.model = this.loginForm.value;
      this.loginService.loginUser(this.model).subscribe((data: any) => {
        sessionStorage.setItem('token', JSON.stringify(data));
        this.auth.Login();
        this.auth.setLoginStatus(true);
        this.router.navigate(['/dashboard']);
        
        // setTimeout(() => {
        //   window.location.reload()
        // }, 10);

        
      }
        , (err: any) => {

          this.msg = "Invalid EmailID or Password";
          // alert("Invalid EmailID or Password");
          // this.router.navigate(['/login']);
        });
    }
  }
}
