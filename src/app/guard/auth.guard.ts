import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ValidationService } from '../services/validation/validation.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private validationService: ValidationService, private router: Router){}

  
  canActivate(): boolean{
    if(this.validationService.loggedIn()){
      return true;
    }
    this.router.navigate(["/validation/login"]);
    return false;
  }
  
}
