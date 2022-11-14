import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/personas/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-personas',
  templateUrl: './list-personas.component.html',
  styleUrls: ['./list-personas.component.css']
})
export class ListPersonasComponent implements OnInit {

  listPersonas: Persona[] = []

  constructor( private personaService: PersonaService, private router: Router) { }

  ngOnInit(): void {
    this.getListPersonas();
  }

  getListPersonas(){
    this.personaService.listPersonas()
    .subscribe({
      next: res => {
        console.log(res);
        this.listPersonas = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  editPersona(_id: string){
    Swal.fire({
      title: 'Editar Persona',
      text: '¿Esta seguro de editar esta persona?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/persona/edit-persona",_id]);
      }

    }); 
  }

  deletePersona(_id: string){
    Swal.fire({
      title: 'Eliminar Persona',
      text: '¿Esta seguro de eliminar esta persona?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.personaService.deletePersona(_id).subscribe({
          next: res => {
            Swal.fire({
              title: 'Persona Eliminada',
              text: 'La persona se elimino con ¡exito!',
              icon: 'success',
              showConfirmButton: true,
            });
            this.getListPersonas();
          }, 
          error: err => {
            console.error(err);
          }
        });
      } else {
        console.log("No se elimino la persona");
      }
    })
  }
}
