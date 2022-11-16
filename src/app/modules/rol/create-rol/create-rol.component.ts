import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/roles/rol.service';

@Component({
  selector: 'app-create-rol',
  templateUrl: './create-rol.component.html',
  styleUrls: ['./create-rol.component.css']
})
export class CreateRolComponent implements OnInit {

  formRol: FormGroup;
  rolCreated = new Array<string>();
  formRolDisabled: boolean;

  constructor(private fb: FormBuilder , private rolService: RolService, private router: Router) { 
    this.formRol = this.fb.group({
      tipoUsuario: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
    this.formRolDisabled = false;
  }

  ngOnInit(): void {
  }

  createRol(){

    const rol: Rol = {
      tipoUsuario: this.formRol.get("tipoUsuario")?.value,
    }

    this.rolService.createRol(rol)
      .subscribe({
        next:  res => {
          console.log(res);
          this.rolCreated = Object.values(res);
          console.log(this.rolCreated[0]);
          if (this.rolCreated[0] === rol.tipoUsuario) {
            Swal.fire({
              title: 'Rol ¡Invalido!',
              text: `Ya existe un rol de tipo: ${rol.tipoUsuario}` ,
              icon: 'info',
              showConfirmButton: true,
            });
          }
          else {

            this.formRol.reset();
            this.formRol.disable();
            if(this.formRol.disabled){
              this.formRolDisabled = true
            }

            Swal.fire({
              title: 'Rol ¡Registrados!',
              text: 'EL rol se registró con ¡Exito!',
              icon: 'success',
              showConfirmButton: true,
            });

            this.router.navigate(["/rol/list-roles"]);
            
          }
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  volver(){
    this.router.navigate(["/rol/list-roles"]);
  }
}
