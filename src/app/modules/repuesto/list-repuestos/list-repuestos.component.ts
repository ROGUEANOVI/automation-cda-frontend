import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Repuesto } from 'src/app/models/repuesto';
import { RepuestoService } from 'src/app/services/repuestos/repuesto.service';
import { RevisionRepuestoService } from 'src/app/services/revisiones-repuestos/revision-repuesto.service';
import { RolService } from 'src/app/services/roles/rol.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-repuestos',
  templateUrl: './list-repuestos.component.html',
  styleUrls: ['./list-repuestos.component.css']
})
export class ListRepuestosComponent implements OnInit {

  listRepuestos: Repuesto[] = [];
  listRepuestosRevision: Repuesto[] = [];
  _idVehiculo: string;
  _idRevision: string;
  _rol!: string;

  constructor(private repuestoService: RepuestoService, private revisionRepuestoService: RevisionRepuestoService, private rolService: RolService, private router: Router, private aRouter: ActivatedRoute) {
    this._idVehiculo = this.aRouter.snapshot.paramMap.get("idVehiculo")!; 
    this._idRevision = this.aRouter.snapshot.paramMap.get("idRevision")!; 
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

    if (this._idRevision !== null) {
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
      this.getListRepuestosRevision(this._idRevision);
    }
    else{
      this.getListRepuestos();
    }
  }

  getListRepuestos(){
    this.repuestoService.getListRepuestos()
    .subscribe({
      next: res => {
        console.log(res);
        this.listRepuestos = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getListRepuestosRevision(_idRevision: string){
    this.revisionRepuestoService.getRevisionRepuestos(_idRevision)
    .subscribe({
      next: res => {
        console.log(res);
        this.listRepuestosRevision = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  editRepuesto(_id: string){
    Swal.fire({
      title: 'Editar Repuesto',
      text: '¿Esta seguro de editar este repuesto?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/repuesto/edit-repuesto",_id]);
      }

    }); 
  }

  editRepuestoRevision( _idVehiculo: string,_idRevision: string ,_id: string){
    Swal.fire({
      title: 'Editar Repuesto',
      text: '¿Esta seguro de editar este repuesto?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/repuesto/edit-repuesto", _idVehiculo,_idRevision ,_id]);
      }

    }); 
  }

  deleteRepuesto(_id: string){
    Swal.fire({
      title: 'Eliminar Repuesto',
      text: '¿Esta seguro de eliminar este repuesto?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.repuestoService.deleteRepuesto(_id).subscribe({
          next: res => {
            Swal.fire({
              title: 'Repuesto Eliminado',
              text: 'El repuesto se elimino con ¡exito!',
              icon: 'success',
              showConfirmButton: true,
            });

            if (this._idRevision !== null) {
              this.getListRepuestosRevision(this._idRevision);
            }
            else{
              this.getListRepuestos();
            }
          }, 
          error: err => {
            console.error(err);
          }
        });
      } else {
        console.log("No se elimino el Repuesto");
      }
    })
  }

  createRepuestoRevision(){
    const idUsuario = localStorage.getItem("idUsuario");
    this.router.navigate(["repuesto/create-repuesto",this._idRevision]);
  }
}
