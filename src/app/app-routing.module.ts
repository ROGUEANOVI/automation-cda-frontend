import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';

import { HomeComponent } from './components/template/home/home.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { VehiculosComponent } from './components/vehiculos/vehiculos.component';


const routes: Routes = [

  {path: "", redirectTo:"/inicio", pathMatch: "full"},
  {path:"inicio", component: HomeComponent},
  {path: "validation", loadChildren: () => import("./modules/validation/validation.module").then(x => x.ValidationModule)},
  {path: "persona", loadChildren: () => import("./modules/persona/persona.module").then(x => x.PersonaModule)},
  {path: "rol", loadChildren: () => import("./modules/rol/rol.module").then(x => x.RolModule)},
  {path: "usuario", loadChildren: () => import("./modules/usuario/usuario.module").then(x => x.UsuarioModule)},
  {path: "vehiculo", loadChildren: () => import("./modules/vehiculo/vehiculo.module").then(x => x.VehiculoModule)},
  {path: "seguro-adicional", loadChildren: () => import("./modules/seguro-adicional/seguro-adicional.module").then(x => x.SeguroAdicionalModule)},
  {path: "revision", loadChildren: () => import("./modules/revision/revision.module").then(x => x.RevisionModule)},
  {path: "repuesto", loadChildren: () => import("./modules/repuesto/repuesto.module").then(x => x.RepuestoModule)},
  {path: "vehiculos", component: VehiculosComponent, canActivate: [AuthGuard]},
  {path: "**", component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
