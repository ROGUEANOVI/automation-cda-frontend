import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculos/vehiculo.service';


@Component({
  selector: 'app-list-vehiculos',
  templateUrl: './list-vehiculos.component.html',
  styleUrls: ['./list-vehiculos.component.css']
})
export class ListVehiculosComponent implements OnInit {

  listVehiculos: Vehiculo[] = [];

  constructor( private vehiculoService: VehiculoService, private router: Router) { }

  ngOnInit(): void {
    this.getListVehiculos();
  }

  getListVehiculos(){
    this.vehiculoService.getListVehiculos()
    .subscribe({
      next: res => {
        console.log(res);
        this.listVehiculos = res;
      },
      error: err => {
        console.log(err);
      }
    });
  }

  editVehiculo(_id: string){
    Swal.fire({
      title: 'Editar Vehiculo',
      text: '¿Esta seguro de editar este vehiculo?',
      showCancelButton: true,
      confirmButtonText: 'Si, editar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/vehiculo/edit-vehiculo",_id]);
      }

    }); 
  }

  deleteVehiculo(_id: string){
    Swal.fire({
      title: 'Eliminar Vehiculo',
      text: '¿Esta seguro de eliminar este vehiculo?',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'Cancelar',
      icon: 'warning'
    }).then(result => {
      if (result.value) {
        this.vehiculoService.deleteVehiculo(_id).subscribe({
          next: res => {
            Swal.fire({
              title: 'Vehiculo Eliminado',
              text: 'El vehiculo se elimino con ¡exito!',
              icon: 'success',
              showConfirmButton: true,
            });
            this.getListVehiculos();
          }, 
          error: err => {
            console.error(err);
          }
        });
      } else {
        console.log("No se elimino el vehiculo");
      }
    })
  }

  getListRevisiones(_id: string){
    Swal.fire({
      title: 'Listado De Revisiones',
      text: '¿Quiere acceder al listado de revisiones de este vehiculo?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      icon: 'info'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/revision/list-revisiones",_id]);
      }
    }); 
  }

  createRevision(_id: string){
    Swal.fire({
      title: 'Registro De Revision',
      text: '¿Quiere registrar una revision de este vehiculo?',
      showCancelButton: true,
      confirmButtonText: 'Si',
      cancelButtonText: 'Cancelar',
      icon: 'info'
    }).then(result => {
      if (result.value) {
        this.router.navigate(["/revision/create-revision",_id]);
      }
    }); 
  }

}
