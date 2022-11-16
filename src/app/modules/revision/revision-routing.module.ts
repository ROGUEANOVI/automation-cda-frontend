import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRevisionComponent } from './create-revision/create-revision.component';
import { EditRevisionComponent } from './edit-revision/edit-revision.component';
import { ListRevisionesComponent } from './list-revisiones/list-revisiones.component';

const routes: Routes = [
  {path: "create-revision", component: CreateRevisionComponent},
  {path: "list-revisiones", component: ListRevisionesComponent},
  {path: "edit-revision/:id", component: EditRevisionComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RevisionRoutingModule { }
