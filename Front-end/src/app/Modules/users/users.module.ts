import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { ProfileViewComponent } from './pages/profile-view/profile-view.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserListViewComponent } from './pages/user-list-view/user-list-view.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ButtonsModule } from 'ngx-bootstrap/buttons';


@NgModule({
  declarations: [
    ProfileViewComponent,
    UserListViewComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class UsersModule { }
