import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
//Revisa si hay alguien conectado, si no , no lo deja ingresar a alguna ruta protegida
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService:AuthService, private router:Router){}
  canActivate() {
    if (this.authService.loggedIn()){
      return true
    }
    this.router.navigate(['/login'])
    return false
  }
  

  canActivateChild() {
    if (this.authService.loggedIn()){
      return true
    }
    this.router.navigate(['/login'])
    return false
  }  
  
}