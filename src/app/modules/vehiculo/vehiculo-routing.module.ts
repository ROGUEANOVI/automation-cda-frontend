import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateVehiculoComponent } from './create-vehiculo/create-vehiculo.component';
import { EditVehiculoComponent } from './edit-vehiculo/edit-vehiculo.component';
import { ListVehiculosComponent } from './list-vehiculos/list-vehiculos.component';

const routes: Routes = [
  {path: "create-vehiculo", component: CreateVehiculoComponent},
  {path: "list-vehiculos", component: ListVehiculosComponent},
  {path: "edit-vehiculo/:id", component: EditVehiculoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoRoutingModule { }
