import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { ListRolesComponent } from './list-roles/list-roles.component';
import { CreateRolComponent } from './create-rol/create-rol.component';
import { EditRolComponent } from './edit-rol/edit-rol.component';


@NgModule({
  declarations: [
    ListRolesComponent,
    CreateRolComponent,
    EditRolComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    ReactiveFormsModule
  ]
})
export class RolModule { }
