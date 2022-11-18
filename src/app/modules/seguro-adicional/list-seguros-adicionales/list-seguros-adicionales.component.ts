import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SeguroAdicional } from 'src/app/models/seguroadicional';
import { SeguroAdicionalService } from 'src/app/services/seguros-adicionales/seguro-adicional.service';

@Component({
  selector: 'app-list-seguros-adicionales',
  templateUrl: './list-seguros-adicionales.component.html',
  styleUrls: ['./list-seguros-adicionales.component.css']
})
export class ListSegurosAdicionalesComponent implements OnInit {

  listSegurosAdicionales: SeguroAdicional[] = []

  constructor(private seguroAdicionalService: SeguroAdicionalService, private router: Router) { }

  ngOnInit(): void {
    this.getListSegurosAdicionales();
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
}
