import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/user';
import { Router, ActivatedRoute } from '@angular/router';
import { passwordMatchValidator } from './password-match';
import { RegistrationService } from 'src/services/registration.service';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  signupForm: any;
  model: any ;
  title: any;
  isMessage: boolean = false;
  greenmsg: any;
  msg : string = "";
  pwdPattern = "^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,12}$";
  constructor(private fb: FormBuilder,
    private router: Router,
    private regService : RegistrationService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.createForm();
    this.title = 'Create an account';
  }
  createForm() {
    this.signupForm = this.fb.group({
     // username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
      password: ['', [Validators.required,Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{8,12}$/)]],
      passconf: ['', Validators. required],
      fullName: ['', [Validators.required,Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]]
     }, { validators: passwordMatchValidator })
  }

  get validForm()
   {
      return this.signupForm.controls 
    }
  checkEmail(event:any)
  {
    
    this.regService.checkEmail(event.target.value).subscribe((data:any)=>{
      console.log("check Email"+data);
      if(data == "Email Exists")
      {
        this.greenmsg = false;
        this.msg = "This EmailId Exists try with other EmailID";
      }
      else
      {
        this.greenmsg = true;
        this.msg = "Valid EmailID";
      }
    });
  }
  onSubmit() {
    this.model = this.signupForm.value;
    this.regService.signup(this.model).subscribe(
      (result:any) => 
      {
        
        if(result != "Registration")
        {
          
          this.msg = "This Email ID is already taken Try with new Email ID !!!!";
          setTimeout(() => {
            this.router.routeReuseStrategy.shouldReuseRoute = () => false;
            this.router.onSameUrlNavigation = 'reload';
            this.router.navigate(['./'], { relativeTo: this.route });
        }, 2000);  //2s
          
         
        }
        else
        {
          this.router.navigate(['/login']);
        }
        console.log("Result  ",result)
      }
    )
   
    
    
  }


}
