import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Repuesto } from 'src/app/models/repuesto';
import { RepuestoService } from 'src/app/services/repuestos/repuesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-repuesto',
  templateUrl: './edit-repuesto.component.html',
  styleUrls: ['./edit-repuesto.component.css']
})
export class EditRepuestoComponent implements OnInit {

  formRepuesto: FormGroup;
  id: string;
  constructor(private fb: FormBuilder , private repuestoService: RepuestoService, private router: Router, private aRouter: ActivatedRoute) { 
    this.formRepuesto = this.fb.group({
      descripcion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      cantidad: ["", [Validators.required, Validators.min(1), Validators.max(100)]],
      precio: ["", [Validators.required, Validators.min(10000), Validators.max(20000000)]],
    });
    this.id = this.aRouter.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.loadDataForm();
  }

  editRepuesto(){

    const repuesto: Repuesto = {
      descripcion: this.formRepuesto.get("descripcion")?.value,
      cantidad:  this.formRepuesto.get("cantidad")?.value,
      precio:  this.formRepuesto.get("precio")?.value,
    }

    this.repuestoService.editRepuesto(this.id, repuesto)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formRepuesto.reset();
          this.router.navigate(["/repuesto/list-repuestos"]);

          Swal.fire({
            title: 'Repuesto ¡Actualizado!',
            text: 'Repuesto actualizado con ¡Exito!',
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
      
      this.repuestoService.getRepuesto(this.id).subscribe(
        res => {
          this.formRepuesto.setValue({
            descripcion: res.descripcion,
            cantidad: res.cantidad,
            precio: res.precio
          });
        }
      );
    }
  }

  volver(){
    this.router.navigate(["/repuesto/list-repuestos"]);
  }

}
