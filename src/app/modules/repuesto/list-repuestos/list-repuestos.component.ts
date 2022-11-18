import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Repuesto } from 'src/app/models/repuesto';
import { RepuestoService } from 'src/app/services/repuestos/repuesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-repuestos',
  templateUrl: './list-repuestos.component.html',
  styleUrls: ['./list-repuestos.component.css']
})
export class ListRepuestosComponent implements OnInit {

  listRepuestos: Repuesto[] = []

  constructor(private repuestoService: RepuestoService, private router: Router) { }

  ngOnInit(): void {
    this.getListRepuestos();
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
            this.getListRepuestos();
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
}
