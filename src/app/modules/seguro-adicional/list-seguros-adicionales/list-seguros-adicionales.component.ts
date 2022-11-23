import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SeguroAdicional } from 'src/app/models/seguroadicional';
import { SeguroAdicionalService } from 'src/app/services/seguros-adicionales/seguro-adicional.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { VehiculoSeguroAdicionalService } from 'src/app/services/vehiculos-seguros-adicionales/vehiculo-seguro-adicional.service';

@Component({
  selector: 'app-list-seguros-adicionales',
  templateUrl: './list-seguros-adicionales.component.html',
  styleUrls: ['./list-seguros-adicionales.component.css']
})
export class ListSegurosAdicionalesComponent implements OnInit {

  listSegurosAdicionales: SeguroAdicional[] = [];
  listSegurosAdicionalesVehiculo: SeguroAdicional[] = [];
  _idVehiculo: string;
  _rol!: string;

  constructor(private seguroAdicionalService: SeguroAdicionalService, private vehiculoSeguroAdicionalService: VehiculoSeguroAdicionalService, private rolService: RolService, private router: Router, private aRouter: ActivatedRoute) { 
    this._idVehiculo = this.aRouter.snapshot.paramMap.get("idVehiculo")!; 
  }

  ngOnInit(): void {

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
      this.getListSegurosAdicionalesVehiculo(this._idVehiculo);
    }
    else{
      this.getListSegurosAdicionales();
    }
  }

  getListSegurosAdicionales(){
    this.seguroAdicionalService.getListSegurosAdicionales()
    .subscribe({
      next: res => {
        console.log(res);
        this.listSegurosAdicionales = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  getListSegurosAdicionalesVehiculo(_idVehiculo: string){
    this.vehiculoSeguroAdicionalService.getVehiculoSegurosAdicionales(_idVehiculo)
    .subscribe({
      next: res => {
        console.log(res);
        this.listSegurosAdicionalesVehiculo = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  editSeguroAdicional(_id: string){
    Swal.fire({
      title: 'Editar Seguro Adicional',
      text: '¿Esta seguro de editar este Seguro Adicional?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/seguro-adicional/edit-seguro-adicional",_id]);
      }

    }); 
  }

  editSeguroAdicionalVehiculo(_idVehiculo: string,  _id: string){
    Swal.fire({
      title: 'Editar Seguro Adicional',
      text: '¿Esta seguro de editar este Seguro Adicional?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/seguro-adicional/edit-seguro-adicional",_idVehiculo, _id]);
      }
    }); 
  }

  deleteSeguroAdicional(_id: string){
    Swal.fire({
      title: 'Eliminar Seguro Adicional',
      text: '¿Esta seguro de eliminar este Seguro Adicional?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.seguroAdicionalService.deleteSeguroAdicional(_id).subscribe({
          next: res => {
            Swal.fire({
              title: 'Seguro Adicional Eliminado',
              text: 'El Seguro Adicional se elimino con ¡exito!',
              icon: 'success',
              showConfirmButton: true,
            });
            this.getListSegurosAdicionales();
          }, 
          error: err => {
            console.error(err);
          }
        });
      } else {
        console.log("No se elimino el Seguro Adicional");
      }
    })
  }

  createSeguroAdicionalVehiculo(){
    const idUsuario = localStorage.getItem("idUsuario");
    this.router.navigate(["seguro-adicional/create-seguro-adicional",idUsuario]);
  }
}
