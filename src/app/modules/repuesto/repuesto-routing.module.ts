import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRepuestoComponent } from './create-repuesto/create-repuesto.component';
import { EditRepuestoComponent } from './edit-repuesto/edit-repuesto.component';
import { ListRepuestosComponent } from './list-repuestos/list-repuestos.component';

const routes: Routes = [
  {path: "create-repuesto", component: CreateRepuestoComponent},
  {path: "list-repuestos", component: ListRepuestosComponent},
  {path: "edit-repuesto/:id", component: EditRepuestoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RepuestoRoutingModule { }
