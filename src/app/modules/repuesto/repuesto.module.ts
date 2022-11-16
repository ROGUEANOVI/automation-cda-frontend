import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RepuestoRoutingModule } from './repuesto-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListRepuestosComponent } from './list-repuestos/list-repuestos.component';
import { CreateRepuestoComponent } from './create-repuesto/create-repuesto.component';
import { EditRepuestoComponent } from './edit-repuesto/edit-repuesto.component';


@NgModule({
  declarations: [
    ListRepuestosComponent,
    CreateRepuestoComponent,
    EditRepuestoComponent
  ],
  imports: [
    CommonModule,
    RepuestoRoutingModule,
    ReactiveFormsModule
  ]
})
export class RepuestoModule { }
