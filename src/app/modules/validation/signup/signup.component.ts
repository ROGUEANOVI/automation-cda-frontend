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
  formUsuario: FormGroup;
  personaCreated = new Array<string>();
  rolCreated = new Array<string>();
  rolesList = new Array<Rol>();
  usuarioExists = new Array<string>();
  formPersonaDisabled: boolean;

  constructor(private fb: FormBuilder , private personaService: PersonaService, private rolService: RolService, public validateService: ValidationService, private router: Router) {

    this.formPersona = this.fb.group({
      cedula: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      correo: ["", [Validators.required, Validators.email]],
      direccion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      nivelEstudios: ["Seleccione su nivel de estudios"],
    });

    this.formUsuario = this.fb.group({
      tipoUsuario: ["Seleccione el tipo de usuario"],
      nombreUsuario: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      clave: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });

    this.formPersonaDisabled = false;
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

            this.listRoles();
            
          }
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  listRoles(){
    this.rolService.getListRoles()
    .subscribe({
      next: res => {
        console.log(res);
        this.rolesList = res;
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
      idRol: this.formUsuario.get("tipoUsuario")?.value
    }

    this.validateService.signUp(usuario)
      .subscribe({
        next: res => {
          console.log(res);
          this.usuarioExists = Object.values(res);
          console.log(this.usuarioExists[0]);
          
          if (this.usuarioExists[0] === usuario.nombreUsuario) {
            Swal.fire({
              title: 'Nombre de usuario ¡Invalido!',
              text: `Ya existe un usuario registrado como: ${usuario.nombreUsuario}` ,
              icon: 'info',
              showConfirmButton: true,
            });
          }
          else {
            localStorage.setItem("token", res.token);
            Swal.fire({
              title: 'Usuario Registrado',
              text: 'Usuario Registrado ¡Exitosamente!',
              icon: 'success',
              showConfirmButton: true,
            });
            this.router.navigate(["/vehiculos"]);
            }
          
        },
        error: err =>{
          console.error(err);
        }
      })
  }

}
