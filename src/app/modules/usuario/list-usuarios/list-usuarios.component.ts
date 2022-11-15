import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuarios/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-list-usuarios',
  templateUrl: './list-usuarios.component.html',
  styleUrls: ['./list-usuarios.component.css']
})
export class ListUsuariosComponent implements OnInit {
  
  listUsuarios: Usuario[] = [];

  constructor( private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    this.getListUsuarios();
  }

  getListUsuarios(){
    this.usuarioService.getListUsuarios()
    .subscribe({
      next: res => {
        console.log(res);
        this.listUsuarios = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  editUsuario(_id: string, clave: string){
    Swal.fire({
      title: 'Editar Usuario',
      text: '¿Esta seguro de editar esta usuario?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/usuario/edit-usuario",_id,clave]);
      }

    }); 
  }

  deleteUsuario(_id: string){
    Swal.fire({
      title: 'Eliminar Usuario',
      text: '¿Esta seguro de eliminar este usuario?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.usuarioService.deleteUsuario(_id).subscribe({
          next: res => {
            Swal.fire({
              title: 'usuario Eliminado',
              text: 'El usuario se elimino con ¡exito!',
              icon: 'success',
              showConfirmButton: true,
            });
            this.getListUsuarios();
          }, 
          error: err => {
            console.error(err);
          }
        });
      } else {
        console.log("No se elimino el usuario");
      }
    })
  }
}
