import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb:FormBuilder , private auth:AuthService) { }

  ngOnInit(): void {
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
    this.auth.signIn(loginData).subscribe((response:apiResponse)=>{
      if(response.success){
        console.log(response);
      }else{
        console.log(response.message);
      }


    },(error:any)=>console.log(error)
    
    );
    
  }
  
  signUp(){
    
  }
}
