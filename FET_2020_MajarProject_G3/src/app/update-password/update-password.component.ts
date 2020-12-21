import { Component, OnInit, ɵɵtrustConstantResourceUrl, ɵConsole } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { passwordMatchValidator } from '../components/registration/password-match';
import { LoginServicesService } from '../login-services.service';
import { error } from '@angular/compiler/src/util';
@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
  updatePassword: any;
  
  constructor(private fb: FormBuilder,
    private router: Router, private loginService : LoginServicesService) 
    {
    }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.updatePassword = this.fb.group({
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[A-Z])(?=.*[!@#\$%\^&\*])(?=.{8,})/)]],
      passconf: ['', Validators. required],
      email: ['', [Validators.required, Validators.email]]
     }, { validators: passwordMatchValidator })
  }

  get f() { return this.updatePassword.controls }
  passwordUpdate()
  {
    this.loginService.updatePassword(this.updatePassword.value).subscribe((data)=>{
      
      this.router.navigate(['/login']);
    },
    (error)=>{

    })
    console.log(this.updatePassword.value);
  }

}
