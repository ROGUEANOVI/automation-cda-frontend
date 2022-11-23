import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRepuestoComponent } from './create-repuesto/create-repuesto.component';
import { EditRepuestoComponent } from './edit-repuesto/edit-repuesto.component';
import { ListRepuestosComponent } from './list-repuestos/list-repuestos.component';

const routes: Routes = [
  {path: "create-repuesto", component: CreateRepuestoComponent},
  {path: "list-repuestos", component: ListRepuestosComponent},
  {path: "edit-repuesto/:id", component: EditRepuestoComponent},
  {path: "create-repuesto/:idRevision", component: CreateRepuestoComponent},
  {path: "list-repuestos/:idRevsion", component: ListRepuestosComponent},
  {path: "edit-repuesto/:idRevision/:id", component: EditRepuestoComponent},
  {path: "create-repuesto/:idVehiculo/:idRevision", component: CreateRepuestoComponent},
  {path: "list-repuestos/:idVehiculo/:idRevision", component: ListRepuestosComponent},
  {path: "edit-repuesto/:idVehiculo/:idRevision/:id", component: EditRepuestoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepuestoRoutingModule { }
