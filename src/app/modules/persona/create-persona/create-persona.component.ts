import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/personas/persona.service';

@Component({
  selector: 'app-create-persona',
  templateUrl: './create-persona.component.html',
  styleUrls: ['./create-persona.component.css']
})
export class CreatePersonaComponent implements OnInit {
  formPersona: FormGroup;
  personaCreated = new Array<string>();
  formPersonaDisabled: boolean;

  constructor(private fb: FormBuilder , private personaService: PersonaService, private router: Router) {

    this.formPersona = this.fb.group({
      cedula: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      correo: ["", [Validators.required, Validators.email]],
      direccion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      nivelEstudios: ["Seleccione su nivel de estudios"],
    });
    this.formPersonaDisabled = false;
  }

  ngOnInit(): void {
  }

  createPersona(){
    const persona: Persona = {
      cedula: this.formPersona.get("cedula")?.value,
      nombre: this.formPersona.get("nombre")?.value,
      apellidos: this.formPersona.get("apellidos")?.value,
      telefono: this.formPersona.get("telefono")?.value,
      correo: this.formPersona.get("correo")?.value,
      direccion: this.formPersona.get("direccion")?.value,
      nivelEstudios: this.formPersona.get("nivelEstudios")?.value,
    }

    this.personaService.createPersona(persona)
      .subscribe({
        next:  res => {
          console.log(res);
          this.personaCreated = Object.values(res);
          console.log(this.personaCreated[0]);
          if (this.personaCreated[0] === persona.cedula) {
            Swal.fire({
              title: 'Cedula ¡Invalida!',
              text: `Ya existe una persona registrado con cedula: ${persona.cedula}` ,
              icon: 'info',
              showConfirmButton: true,
            });
          }
          else {

            this.formPersona.reset();
            this.formPersona.disable();
            if(this.formPersona.disabled){
              this.formPersonaDisabled = true
            }

            Swal.fire({
              title: 'Datos personales ¡Registrados!',
              text: 'Datos personales registrados con ¡Exito!',
              icon: 'success',
              showConfirmButton: true,
            });
            
          }
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  volver(){
    this.router.navigate(["/persona/list-personas"]);
  }
}
