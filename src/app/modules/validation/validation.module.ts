import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationRoutingModule } from './validation-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


// COMPONENTS
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';




@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ValidationRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ValidationModule { }
