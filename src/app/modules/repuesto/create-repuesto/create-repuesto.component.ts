import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Repuesto } from 'src/app/models/repuesto';
import { RepuestoService } from 'src/app/services/repuestos/repuesto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-repuesto',
  templateUrl: './create-repuesto.component.html',
  styleUrls: ['./create-repuesto.component.css']
})
export class CreateRepuestoComponent implements OnInit {
  formRepuesto: FormGroup;
  repuestoCreated = new Array<string>();
  formRepuestoDisabled: boolean;

  constructor(private fb: FormBuilder , private repuestoService: RepuestoService, private router: Router) { 
    this.formRepuesto = this.fb.group({
      descripcion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
      cantidad: ["", [Validators.required, Validators.min(1), Validators.max(100)]],
      precio: ["", [Validators.required, Validators.min(10000), Validators.max(20000000)]],
    });
    this.formRepuestoDisabled = false;
  }

  ngOnInit(): void {
  }

  createRepuesto(){

    const repuesto: Repuesto = {
      descripcion: this.formRepuesto.get("descripcion")?.value,
      cantidad:  this.formRepuesto.get("cantidad")?.value,
      precio:  this.formRepuesto.get("precio")?.value,
    }

    this.repuestoService.createRepuesto(repuesto)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formRepuesto.reset();
          this.formRepuesto.disable();
          if(this.formRepuesto.disabled){
            this.formRepuestoDisabled = true
          }

          Swal.fire({
            title: 'Repuesto ¡Registrado!',
            text: 'EL Repuesto se registró con ¡Exito!',
            icon: 'success',
            showConfirmButton: true,
          });

          this.router.navigate(["/repuesto/list-repuestos"]);

        },
        error: err =>{
          console.error(err);
        }
      })
  }

  volver(){
    this.router.navigate(["/repuesto/list-repuestos"]);
  }

}
