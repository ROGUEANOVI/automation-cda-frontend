import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

  formUsuario: FormGroup;
  usuarioCreated = new Array<string>();
  formUsuarioDisabled: boolean;
  usuarioExists = new Array<string>();

  constructor(private fb: FormBuilder , private usuarioService: UsuarioService, private router: Router) { 
    this.formUsuario = this.fb.group({
      nombreUsuario: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      clave: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      idPersona: ["", [Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
      idRol: ["", [Validators.required, Validators.minLength(24), Validators.maxLength(24)]]
    });

    this.formUsuarioDisabled = false;
  }

  ngOnInit(): void {
  }

  createUsuario(){
    
    const usuario: Usuario = {
      nombreUsuario: this.formUsuario.get("nombreUsuario")?.value,
      clave: this.formUsuario.get("clave")?.value,
      idPersona: this.formUsuario.get("idPersona")?.value,
      idRol: this.formUsuario.get("idRol")?.value
    }

    this.usuarioService.createUsuario(usuario)
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
            Swal.fire({
              title: 'Usuario Registrado',
              text: 'Usuario Registrado ¡Exitosamente!',
              icon: 'success',
              showConfirmButton: true,
            });
            this.router.navigate(["/usuario/list-usuarios"]);
            }
          
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  volver(){
    this.router.navigate(["/usuario/list-usuarios"]);
  }
}
