import { Component, OnInit } from '@angular/core';
import { LoginServicesService } from '../login-services.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  contactForm : any ;
  // mydetails : any;
  constructor(private servicelogin : LoginServicesService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm() {
    this.contactForm = this.fb.group({
     // username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],
     Subject: ['', [Validators.required]],
     Message: ['', Validators. required],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
     })
  }

  get validForm() { return this.contactForm.controls }

  onSubmit() {}
}
