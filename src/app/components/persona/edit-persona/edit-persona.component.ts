import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonaService } from 'src/app/services/personas/persona.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-persona',
  templateUrl: './edit-persona.component.html',
  styleUrls: ['./edit-persona.component.css']
})
export class EditPersonaComponent implements OnInit {

  formPersona: FormGroup;
  id: string;

  constructor(private fb: FormBuilder , private personaService: PersonaService, private router: Router, private aRouter: ActivatedRoute ) {

    this.formPersona = this.fb.group({
      cedula: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      correo: ["", [Validators.required, Validators.email]],
      direccion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      nivelEstudios: ["Seleccione su nivel de estudios"],
    });
    this.id = this.aRouter.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.loadDataForm()
  }

  editPersona(){
    const persona: Persona = {
      cedula: this.formPersona.get("cedula")?.value,
      nombre: this.formPersona.get("nombre")?.value,
      apellidos: this.formPersona.get("apellidos")?.value,
      telefono: this.formPersona.get("telefono")?.value,
      correo: this.formPersona.get("correo")?.value,
      direccion: this.formPersona.get("direccion")?.value,
      nivelEstudios: this.formPersona.get("nivelEstudios")?.value,
    }

    this.personaService.editPersona(this.id, persona)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formPersona.reset();
          this.router.navigate(["/list-personas"]);

          Swal.fire({
            title: 'Datos personales ¡Actualizados!',
            text: 'Datos personales actualizados con ¡Exito!',
            icon: 'success',
            showConfirmButton: true,
          });
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  loadDataForm(){
    if(this.id !== null){
      
      this.personaService.getPersona(this.id).subscribe(
        res => {
          this.formPersona.setValue({
            cedula: res.cedula,
            nombre: res.nombre,
            apellidos: res.apellidos,
            telefono: res.telefono,
            correo: res.correo,
            direccion: res.direccion,
            nivelEstudios: res.nivelEstudios
          });
        }
      );
    }
  }

  volver(){
    this.router.navigate(["/list-personas"]);
  }

}
