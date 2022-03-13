import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { loginReq, typeUser } from '../../interfaces/user';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {
  public loginForm:FormGroup
  showErrorMessage:number;

  constructor(private fb:FormBuilder , private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    if(this.auth.loggedIn()==true){
      this.router.navigate(["dashboard"])
    }
    this.showErrorMessage=1;
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })

  }
  logIn(email:any,password:any){
    let loginData:loginReq={
      email:email,
      password:password
    }
    this.auth.signIn(loginData).subscribe(async (response:apiResponse)=>{
      if(response.success){
        this.showErrorMessage=1;
        sessionStorage.setItem('token',response.data.token);
        sessionStorage.setItem('id_company',response.data.user.id_company);
        await this.auth.setUserRole();
        this.router.navigate(["dashboard"]);
      }else{
        console.log(response.message);
      }


    },(error:any)=>{
      console.log(error)
      this.showErrorMessage=0;
    }
    
    );
    
  }
  
  goToForgotPassword(){
    this.router.navigate(['forgotPassword'])

  }
}
