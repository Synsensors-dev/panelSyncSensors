import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create-password-view',
  templateUrl: './create-password-view.component.html',
  styleUrls: ['./create-password-view.component.scss']
})
export class CreatePasswordViewComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute, private authService:AuthService, private fb:FormBuilder , private router:Router) { }
  token:string;
  public resetPasswordForm:FormGroup
  @ViewChild('successModal') public successModal: ModalDirective;

  ngOnInit(): void {
    this.token = this.activatedRoute.snapshot.params.token;


    this.resetPasswordForm=this.fb.group({
      password:['',[Validators.required,Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*ñ?&]{8,}$")]],
      confirmPassword:['',Validators.required],
    })
  }

  submitNewPassword(){
    console.log(this.resetPasswordForm.get('password').value)
    console.log(this.resetPasswordForm.get('confirmPassword').value)
    console.log(this.resetPasswordForm.valid)
    this.authService.resetPassword(this.resetPasswordForm.get('password').value,this.token).subscribe((response:apiResponse)=>{
      if(response.success){
        console.log(response)

        this.successModal.show()

        setTimeout(() => {
          this.successModal.hide()
          this.router.navigate(['login'])
        }, 4000);

      }else{

        console.log(response.message);

      }

    },(error:any)=>{

      console.log(error)

    })

  }

}
