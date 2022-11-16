import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RevisionRoutingModule } from './revision-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListRevisionesComponent } from './list-revisiones/list-revisiones.component';
import { CreateRevisionComponent } from './create-revision/create-revision.component';
import { EditRevisionComponent } from './edit-revision/edit-revision.component';


@NgModule({
  declarations: [
    ListRevisionesComponent,
    CreateRevisionComponent,
    EditRevisionComponent
  ],
  imports: [
    CommonModule,
    RevisionRoutingModule,
    ReactiveFormsModule
  ]
})
export class RevisionModule { }
