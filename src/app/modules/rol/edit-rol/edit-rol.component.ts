import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/roles/rol.service';

@Component({
  selector: 'app-edit-rol',
  templateUrl: './edit-rol.component.html',
  styleUrls: ['./edit-rol.component.css']
})
export class EditRolComponent implements OnInit {

  formRol: FormGroup;
  id: string;

  constructor(private fb: FormBuilder , private rolService: RolService, private router: Router, private aRouter: ActivatedRoute) { 
    this.formRol = this.fb.group({
      tipoUsuario: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    });
    this.id = this.aRouter.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.loadDataForm();
  }

  editRol(){

    const rol: Rol = {
      tipoUsuario: this.formRol.get("tipoUsuario")?.value,
    }

    this.rolService.editRol(this.id, rol)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formRol.reset();
          this.router.navigate(["/rol/list-roles"]);

          Swal.fire({
            title: 'Tipo de usuario ¡Actualizado!',
            text: 'Tipo de usuario actualizado con ¡Exito!',
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
      
      this.rolService.getRol(this.id).subscribe(
        res => {
          this.formRol.setValue({
            tipoUsuario: res.tipoUsuario,
          });
        }
      );
    }
  }

  volver(){
    this.router.navigate(["/rol/list-roles"]);
  }

}
