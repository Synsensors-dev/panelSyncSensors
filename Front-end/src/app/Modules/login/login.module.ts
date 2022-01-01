import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LoginViewComponent } from './pages/login-view/login-view.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginViewComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LoginRoutingModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
