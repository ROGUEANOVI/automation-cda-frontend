import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUsuarioComponent } from './create-usuario/create-usuario.component';
import { EditUsuarioComponent } from './edit-usuario/edit-usuario.component';
import { ListUsuariosComponent } from './list-usuarios/list-usuarios.component';

const routes: Routes = [
  {path: "create-usuario", component: CreateUsuarioComponent},
  {path: "list-usuarios", component: ListUsuariosComponent},
  {path: "edit-usuario/:id/:clave", component: EditUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
