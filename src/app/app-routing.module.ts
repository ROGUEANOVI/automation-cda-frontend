import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/template/home/home.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [

  {path: "", redirectTo:"/inicio", pathMatch: "full"},
  {path:"inicio", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "vehiculos", component: VehiculosComponent, canActivate: [AuthGuard]},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
