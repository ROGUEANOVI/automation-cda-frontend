import { Injectable } from '@angular/core';
import {HttpInterceptor} from '@angular/common/http';
import { ValidationService } from '../validation/validation.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private validationService: ValidationService) { }
  
  intercept(req: any, next: any) {
    const tokenizeReq = req.clone({
      setHeaders: {
      Authorization: `Bearer ${this.validationService.getToken()}`
      }
    })
    return next.handle(tokenizeReq);
  }
}
