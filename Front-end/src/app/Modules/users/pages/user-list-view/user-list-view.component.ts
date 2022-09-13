import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { typeUser } from '../../../login/interfaces/user';
import { AuthService } from '../../../login/services/auth.service';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {
  @ViewChild('newUserModal') public newUserModal: ModalDirective;
  @ViewChild('successModal') public successModal: ModalDirective;
  userList:any;
  newUserForm:FormGroup;

  constructor(private usersService:UsersService, private fb:FormBuilder, private auth:AuthService) { }

  ngOnInit(): void {
    this.newUserForm=this.fb.group({
      name:['',Validators.required],
      email:['',Validators.required],
      roles:['',Validators.required]

    })
    this.usersService.getUserList().subscribe((response:apiResponse)=>{
      if(response.success){
        this.userList=response.data;
        console.log(response)
      }else{
        console.log(response.message)
      }
    })
  }

  async addUser(){
    let newUser:typeUser={
      email:'',
      name:'',
      roles:[],
      id_company:''
    };
    newUser.email=this.newUserForm.get("email").value;
    newUser.id_company=this.auth.getUserCompanyId();
    newUser.name=this.newUserForm.get("name").value;
    newUser.roles.push(this.newUserForm.get("roles").value)

    const response=await this.auth.signUp(newUser).toPromise();
    if(response.success){
      this.newUserModal.hide()
      this.successModal.show()
      const response2=await this.usersService.getUserList().toPromise();
      if(response2.success){
        this.userList=response2.data;
      }

    }

  }

}
