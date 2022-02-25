import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {

  profileForm:FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.profileForm=this.fb.group({
      rut:[],
      email:[],
      password:[],
      fullName:[],
      role:[],
      company:[]
    })
  }

}
