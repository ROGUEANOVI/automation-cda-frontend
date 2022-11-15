import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';
import { ListRolesComponent } from './list-roles/list-roles.component';

const routes: Routes = [
  {path: "create-rol", component: CreateRolComponent},
  {path: "list-roles", component: ListRolesComponent},
  {path: "edit-rol/:id", component: EditRolComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolRoutingModule { }
