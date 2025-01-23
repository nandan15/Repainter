import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonHelper } from 'src/app/Shared/Provider/CommonHelper';
import { LoginProvider } from 'src/app/Shared/Provider/LoginProvider';
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {
  loginForm!: FormGroup;
  hidePassword = true;
  isSubmitted:boolean=false;
  username:string="";
  password:string="";
  userlogin=true;
  userregister=false;
  constructor(private fb: FormBuilder,private loginprovider:LoginProvider,private commonHelper:CommonHelper,private router:Router) {}
  ngOnInit():void{  
    this.loginForm = this.fb.group({
      username: ['', [ Validators.required,Validators.pattern('^[a-zA-Z0-9_-]{3,20}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
this.commonHelper.validateAllFormFields(this.loginForm);
  }
  get f(){return this.loginForm.controls;}
  onSubmit() {
   console.log("Form values:",this.loginForm.value);
   this.isSubmitted=true;
   if(this.loginForm.valid){
    console.log("Form is valid. Attempting login...");
    this.loginprovider.login(this.f['username'].value,this.f['password'].value);
  }else{
    console.log("Form is invalid.Not attempting login.");
    this.commonHelper.validateAllFormFields(this.loginForm);
  }
  }
  isFieldValid(field:string):boolean{
    const control=this.loginForm.get(field);
    return control?!control.valid && control.touched:false;
  }
  user_register(){
    this.userlogin=false;
    this.userregister=true;
  }
  user_login():void{
    localStorage.setItem("LoggedIn","True");
    this.router.navigate(['/dashboard/dashboard']);
  }
  login(){
    this.userlogin=true;
    this.userregister=false;
  }
  onForgotPassword() {
    console.log('Forgot password clicked');
    // Add your forgot password logic here
  }
}
