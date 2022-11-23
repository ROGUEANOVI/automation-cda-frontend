import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Revision } from 'src/app/models/revision';
import { RevisionService } from 'src/app/services/revisiones/revision.service';
import { RolService } from 'src/app/services/roles/rol.service';

@Component({
  selector: 'app-list-revisiones',
  templateUrl: './list-revisiones.component.html',
  styleUrls: ['./list-revisiones.component.css']
})
export class ListRevisionesComponent implements OnInit {

  listRevisiones: Revision[] = [];
  listRevisionesVehiculo: Revision[] = [];
  _idVehiculo: string;
  _rol!: string;

  constructor(private revisionService: RevisionService , private rolService: RolService, private router: Router, private aRouter: ActivatedRoute) {
    this._idVehiculo = this.aRouter.snapshot.paramMap.get("idVehiculo")!; 
   }

  ngOnInit(): void {

    this.rolService.rolEmmiter.subscribe({
      next: (res: any) => {
        console.log(res);
        this._rol = res;
        localStorage.setItem("rol", res);
      },
      error: (err: any) => {
        console.log(err);
      }
    });

    if (this._idVehiculo !== null) {
      this.rolService.rolEmmiter.subscribe({
        next: (res: any) => {
          console.log(res);
          this._rol = res;
          localStorage.setItem("rol", res);
        },
        error: (err: any) => {
          console.log(err);
        }
      });
      this.getListRevisionesVehiculo(this._idVehiculo);
    }
    else{
      this.getListRevisiones();
    }
    
  }

  getListRevisiones(){
    this.revisionService.getListRevisiones()
    .subscribe({
      next: res => {
        console.log(res);
        this.listRevisiones = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getListRevisionesVehiculo(_idVehiculo: string){
    this.revisionService.getListRevisiones()
    .subscribe({
      next: res => {
        console.log(res);
        this.listRevisionesVehiculo = res.filter((revision) => revision.idVehiculo === _idVehiculo)
        console.log(this.listRevisionesVehiculo);
      },
      error: err => {
        console.log(err);
      }
    });
  }

  editRevision(_id: string){
    Swal.fire({
      title: 'Editar Revision',
      text: '¿Esta seguro de editar esta revision?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/revision/edit-revision", _id]);
      }
    }); 
  }

  editRevisionVehiculo(_idVehiculo: string, _idRevision: string){
    Swal.fire({
      title: 'Editar Revision',
      text: '¿Esta seguro de editar esta revision?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/revision/edit-revision",_idVehiculo, _idRevision]);
      }
    }); 
  }

  deleteRevision(_id: string){
    Swal.fire({
      title: 'Eliminar Revision',
      text: '¿Esta seguro de eliminar esta revision?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.revisionService.deleteRevision(_id).subscribe({
          next: res => {
            Swal.fire({
              title: 'Revision Eliminada',
              text: 'La revision se elimino con ¡exito!',
              icon: 'success',
              showConfirmButton: true,
            });

            if (this._idVehiculo !== null) {
              this.getListRevisionesVehiculo(this._idVehiculo);
            }
            else{
              this.getListRevisiones();
            }

          }, 
          error: err => {
            console.error(err);
          }
        });
      } else {
        console.log("No se elimino la revision");
      }
    })
  }


  getListRepuestos( _idVehiculo: string,_idRevision: string){
    Swal.fire({
      title: 'Listado De Repuestos',
      text: '¿Quiere acceder al listado de repuestos de esta revision?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      icon: 'info'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/repuesto/list-repuestos", _idVehiculo,_idRevision]);
      }
    }); 
  }

  createRepuesto(_idVehiculo: string , _idRevision: string){
    Swal.fire({
      title: 'Registro De Repuesto',
      text: '¿Quiere registrar un repuesto de esta revision?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      icon: 'info'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/repuesto/create-repuesto", _idVehiculo,_idRevision]);
      }
    }); 
  }

  createRevisionVehiculo(){
    const idUsuario = localStorage.getItem("idUsuario");
    this.router.navigate(["revision/create-revision",this._idVehiculo]);
  }

}
