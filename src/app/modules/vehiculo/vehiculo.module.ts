import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { ListVehiculoComponent } from './list-vehiculo/list-vehiculo.component';
import { CreateVehiculoComponent } from './create-vehiculo/create-vehiculo.component';
import { EditVehiculoComponent } from './edit-vehiculo/edit-vehiculo.component';
import { ListVehiculosComponent } from './list-vehiculos/list-vehiculos.component';


@NgModule({
  declarations: [
    ListVehiculoComponent,
    CreateVehiculoComponent,
    EditVehiculoComponent,
    ListVehiculosComponent
  ],
  imports: [
    CommonModule,
    VehiculoRoutingModule
  ]
})
export class VehiculoModule { }
