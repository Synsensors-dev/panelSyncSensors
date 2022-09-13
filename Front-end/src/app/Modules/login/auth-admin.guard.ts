import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
  canActivate(){
    if(this.auth.getUserRole()=='super_admin' || this.auth.getUserRole()=='admin'){
      return true;
    }
    this.router.navigate(['/'])
    return false;
  }
  
}
