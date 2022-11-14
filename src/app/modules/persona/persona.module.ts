import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { CreatePersonaComponent } from './create-persona/create-persona.component';
import { ListPersonasComponent } from './list-personas/list-personas.component';
import { EditPersonaComponent } from './edit-persona/edit-persona.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    CreatePersonaComponent,
    ListPersonasComponent,
    EditPersonaComponent
  ],
  imports: [
    CommonModule,
    PersonaRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class PersonaModule { }
