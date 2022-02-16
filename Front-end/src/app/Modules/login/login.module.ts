import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CreatePasswordViewComponent } from './pages/create-password-view/create-password-view.component';
import { ForgotPasswordViewComponent } from './pages/forgot-password-view/forgot-password-view.component';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    LoginViewComponent,
    CreatePasswordViewComponent,
    ForgotPasswordViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    ModalModule.forRoot()
  ]
})
export class LoginModule { }
