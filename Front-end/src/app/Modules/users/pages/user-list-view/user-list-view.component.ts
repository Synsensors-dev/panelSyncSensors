import { Component, OnInit } from '@angular/core';
import { apiResponse } from '../../../shared/interfaces/apiResponse';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-user-list-view',
  templateUrl: './user-list-view.component.html',
  styleUrls: ['./user-list-view.component.scss']
})
export class UserListViewComponent implements OnInit {

  userList:any;

  constructor(private usersService:UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserList().subscribe((response:apiResponse)=>{
      if(response.success){
        this.userList=response.data;
        console.log(response)
      }else{
        console.log(response.message)
      }
    })
  }

}
