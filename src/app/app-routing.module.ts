import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CreatePersonaComponent } from './components/persona/create-persona/create-persona.component';
import { EditPersonaComponent } from './components/persona/edit-persona/edit-persona.component';
import { ListPersonasComponent } from './components/persona/list-personas/list-personas.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/template/home/home.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';
import { AuthGuard } from './guard/auth.guard';


const routes: Routes = [

  {path: "", redirectTo:"/inicio", pathMatch: "full"},
  {path:"inicio", component: HomeComponent},
  {path: "login", component: LoginComponent},
  {path: "signup", component: SignupComponent},
  {path: "create-persona", component: CreatePersonaComponent},
  {path: "list-personas", component: ListPersonasComponent},
  {path: "edit-persona/:id", component: EditPersonaComponent},
  {path: "vehiculos", component: VehiculosComponent, canActivate: [AuthGuard]},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
