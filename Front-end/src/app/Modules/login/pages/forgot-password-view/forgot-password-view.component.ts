import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password-view',
  templateUrl: './forgot-password-view.component.html',
  styleUrls: ['./forgot-password-view.component.scss']
})
export class ForgotPasswordViewComponent implements OnInit {

  constructor(private authService:AuthService, private fb:FormBuilder , private router:Router) { }
  public forgotPasswordForm:FormGroup
  @ViewChild('successModal') public successModal: ModalDirective;

  ngOnInit(): void {

    this.forgotPasswordForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
    })

  }
  submitButton(){
    this.authService.sendResetPasswordRequest(this.forgotPasswordForm.get('email').value).subscribe((response:apiResponse)=>{
    if(response.success){
      console.log(response)
      this.successModal.show()

    }else{

      console.log(response.message);

    }

  },(error:any)=>{

    console.log(error)

  })
}
  

}
