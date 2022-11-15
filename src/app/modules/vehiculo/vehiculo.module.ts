import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

// COMPONENTS
import { CreateVehiculoComponent } from './create-vehiculo/create-vehiculo.component';
import { EditVehiculoComponent } from './edit-vehiculo/edit-vehiculo.component';
import { ListVehiculosComponent } from './list-vehiculos/list-vehiculos.component';


@NgModule({
  declarations: [
    CreateVehiculoComponent,
    EditVehiculoComponent,
    ListVehiculosComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule,
    ReactiveFormsModule
  ]
})
export class VehiculoModule { }
