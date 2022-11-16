import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguroAdicionalRoutingModule } from './seguro-adicional-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { CreateSeguroAdicionalComponent } from './create-seguro-adicional/create-seguro-adicional.component';
import { EditSeguroAdicionalComponent } from './edit-seguro-adicional/edit-seguro-adicional.component';
import { ListSegurosAdicionalesComponent } from './list-seguros-adicionales/list-seguros-adicionales.component';


@NgModule({
  declarations: [
    CreateSeguroAdicionalComponent,
    EditSeguroAdicionalComponent,
    ListSegurosAdicionalesComponent
  ],
  imports: [
    CommonModule,
    SeguroAdicionalRoutingModule,
    ReactiveFormsModule
  ]
})
export class SeguroAdicionalModule { }
