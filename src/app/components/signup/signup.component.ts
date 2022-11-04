import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formPersona: FormGroup;
  formRol: FormGroup;
  formUsuario: FormGroup;
  personaCreated = new Array<string>();
  rolCreated = new Array<string>();

  constructor(private fb: FormBuilder , private personaService: PersonaService, private rolService: RolService, public validateService: ValidationService, private router: Router) {

    this.formPersona = this.fb.group({
      cedula: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      correo: ["", [Validators.required, Validators.email]],
      direccion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      nivelEstudios: ["Seleccione su nivel de estudios", [Validators.required]],
      tipoUsuario: ["Seleccione su rol", [Validators.required]],
      
    });

    this.formRol = this.fb.group({
      tipoUsuario: ["Seleccione su rol", [Validators.required]]
    });

    this.formUsuario = this.fb.group({
      nombreUsuario: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      clave: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });

  }

  ngOnInit(): void {
  }

  createPersona () {
    const persona: Persona = {
      cedula: this.formPersona.get("cedula")?.value,
      nombre: this.formPersona.get("nombre")?.value,
      apellidos: this.formPersona.get("apellidos")?.value,
      telefono: this.formPersona.get("telefono")?.value,
      correo: this.formPersona.get("correo")?.value,
      direccion: this.formPersona.get("direccion")?.value,
      nivelEstudios: this.formPersona.get("nivelEstudios")?.value
    }
    
    this.personaService.createPersona(persona)
      .subscribe({
        next:  res => {
          console.log(res);
          this.personaCreated = Object.values(res);
          console.log(this.personaCreated[0]);
          Swal.fire({
            title: 'Datos Personales',
            text: 'Datos Personales Gurdados Con Exito',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  createRol () {
    const rol: Rol = {
      tipoUsuario: this.formRol.get("tipoUsuario")?.value
    }

    this.rolService.createRol(rol)
      .subscribe({
        next: res => {
          console.log(res);
          this.rolCreated = Object.values(res);
          console.log(this.rolCreated[0]);
          Swal.fire({
            title: 'Rol Asignado',
            text: 'Rol Asignado Con Exito',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
        },
        error: err => {
          console.error(err);
        }
      });
  
  }

  signUp(){
    
    const usuario: Usuario = {
      nombreUsuario: this.formUsuario.get("nombreUsuario")?.value,
      clave: this.formUsuario.get("clave")?.value,
      idPersona: this.personaCreated[0],
      idRol: this.rolCreated[0]
    }

    this.validateService.signUp(usuario)
      .subscribe({
        next: res => {
          console.log(res);
          localStorage.setItem("token", res.token);
          Swal.fire({
            title: 'Usuario Registrado',
            text: 'Usuario Registrado Con Exito',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
          });
          this.router.navigate(["/login"]);
        },
        error: err =>{
          console.error(err);
        }
      })
  }
}
