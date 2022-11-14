import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePersonaComponent } from './create-persona/create-persona.component';
import { EditPersonaComponent } from './edit-persona/edit-persona.component';
import { ListPersonasComponent } from './list-personas/list-personas.component';

const routes: Routes = [
  {path: "create-persona", component: CreatePersonaComponent},
  {path: "list-personas", component: ListPersonasComponent},
  {path: "edit-persona/:id", component: EditPersonaComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
