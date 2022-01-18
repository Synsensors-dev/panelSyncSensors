import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePasswordViewComponent } from './pages/create-password-view/create-password-view.component';
import { ForgotPasswordViewComponent } from './pages/forgot-password-view/forgot-password-view.component';
import { LoginViewComponent } from './pages/login-view/login-view.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginViewComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path:"user/resetPassword/:token",
    component:CreatePasswordViewComponent,
    data:{
      title: 'Create new password'
    }
  },
  {
    path:"forgotPassword",
    component:ForgotPasswordViewComponent,
    data:{
      title:"Forgot Password View"
    }
  }
];

@NgModule({
  imports: [CommonModule,RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
