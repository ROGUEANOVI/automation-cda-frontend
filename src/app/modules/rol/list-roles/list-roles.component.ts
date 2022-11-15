import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/roles/rol.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-roles',
  templateUrl: './list-roles.component.html',
  styleUrls: ['./list-roles.component.css']
})
export class ListRolesComponent implements OnInit {

  listRoles: Rol[] = []

  constructor(private rolService: RolService, private router: Router) { }

  ngOnInit(): void {
    this.getListRoles();
  }

  getListRoles(){
    this.rolService.getListRoles()
    .subscribe({
      next: res => {
        console.log(res);
        this.listRoles = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  editRol(_id: string){
    Swal.fire({
      title: 'Editar Rol',
      text: '¿Esta seguro de editar este Rol?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/rol/edit-rol",_id]);
      }

    }); 
  }

  deleteRol(_id: string){
    Swal.fire({
      title: 'Eliminar Rol',
      text: '¿Esta seguro de eliminar este Rol?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.rolService.deleteRol(_id).subscribe({
          next: res => {
            Swal.fire({
              title: 'Rol Eliminado',
              text: 'El Rol se elimino con ¡exito!',
              icon: 'success',
              showConfirmButton: true,
            });
            this.getListRoles();
          }, 
          error: err => {
            console.error(err);
          }
        });
      } else {
        console.log("No se elimino el Rol");
      }
    })
  }

}
