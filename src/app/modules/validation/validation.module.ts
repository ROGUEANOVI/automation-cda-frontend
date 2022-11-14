import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ValidationRoutingModule } from './validation-routing.module';


// COMPONENTS
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ValidationRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ]
})
export class ValidationModule { }
