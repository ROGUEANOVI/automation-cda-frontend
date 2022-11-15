import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  formUsuario: FormGroup;
  id: string;
  clave: string;

  constructor(private fb: FormBuilder , private usuarioService: UsuarioService, private router: Router, private aRouter: ActivatedRoute) { 
    this.formUsuario = this.fb.group({
      nombreUsuario: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      clave: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      idPersona: ["", [Validators.required, Validators.minLength(24), Validators.maxLength(24)]],
      idRol: ["", [Validators.required, Validators.minLength(24), Validators.maxLength(24)]]
    });
    this.id = this.aRouter.snapshot.paramMap.get("id")!;
    this.clave = this.aRouter.snapshot.paramMap.get("clave")!;
  }

  ngOnInit(): void {
    this.loadDataForm();
  }

  editUsuario(){
    const usuario: Usuario = {
      nombreUsuario: this.formUsuario.get("nombreUsuario")?.value,
      clave: this.formUsuario.get("clave")?.value,
      idPersona: this.formUsuario.get("idPersona")?.value,
      idRol: this.formUsuario.get("idRol")?.value
    }

    this.usuarioService.editUsuario(this.id, usuario)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formUsuario.reset();
          this.router.navigate(["/usuario/list-usuarios"]);

          Swal.fire({
            title: 'Datos del usuario ¡Actualizados!',
            text: 'Datos del usuario actualizados con ¡Exito!',
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
      
      this.usuarioService.getUsuario(this.id).subscribe(
        res => {
          this.formUsuario.setValue({
            nombreUsuario: res.nombreUsuario,
            clave: this.clave,
            idPersona: res.idPersona,
            idRol: res.idRol
          });
        }
      );
    }
  }

  volver(){
    this.router.navigate(["/usuario/list-usuarios"]);
  }

}
