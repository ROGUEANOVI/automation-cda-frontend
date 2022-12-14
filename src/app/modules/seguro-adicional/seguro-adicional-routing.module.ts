import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { CreateSeguroAdicionalComponent } from './create-seguro-adicional/create-seguro-adicional.component';
import { EditSeguroAdicionalComponent } from './edit-seguro-adicional/edit-seguro-adicional.component';
import { ListSegurosAdicionalesComponent } from './list-seguros-adicionales/list-seguros-adicionales.component';

const routes: Routes = [

  {path: "create-seguro-adicional", component: CreateSeguroAdicionalComponent},
  {path: "list-seguros-adicionales", component: ListSegurosAdicionalesComponent},
  {path: "edit-seguro-adicional/:id", component: EditSeguroAdicionalComponent},
  {path: "create-seguro-adicional/:idVehiculo", component: CreateSeguroAdicionalComponent},
  {path: "list-seguros-adicionales/:idVehiculo", component: ListSegurosAdicionalesComponent},
  {path: "edit-seguro-adicional/:idVehiculo/:id", component: EditSeguroAdicionalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguroAdicionalRoutingModule { }
