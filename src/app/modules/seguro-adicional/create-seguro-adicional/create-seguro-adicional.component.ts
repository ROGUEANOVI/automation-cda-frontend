import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SeguroAdicional } from 'src/app/models/seguroadicional';
import { SeguroAdicionalService } from 'src/app/services/seguros-adicionales/seguro-adicional.service';

@Component({
  selector: 'app-create-seguro-adicional',
  templateUrl: './create-seguro-adicional.component.html',
  styleUrls: ['./create-seguro-adicional.component.css']
})
export class CreateSeguroAdicionalComponent implements OnInit {

  formSeguroAdicional: FormGroup;
  seguroAdicionalCreated = new Array<string>();
  formSeguroAdicionalDisabled: boolean;

  constructor(private fb: FormBuilder , private seguroAdicionalService: SeguroAdicionalService, private router: Router) { 
    this.formSeguroAdicional = this.fb.group({
      tipo: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      fechaVencimiento: ["", [Validators.required]]
    });
    this.formSeguroAdicionalDisabled = false;
  }

  ngOnInit(): void {
  }

  createSeguroAdicional(){

    const seguroadicional: SeguroAdicional = {
      tipo: this.formSeguroAdicional.get("tipo")?.value,
      fechaVencimiento: new Date(this.formSeguroAdicional.get("fechaVencimiento")?.value)
    }

    this.seguroAdicionalService.createSeguroAdicional(seguroadicional)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formSeguroAdicional.reset();
          this.formSeguroAdicional.disable();
          if(this.formSeguroAdicional.disabled){
            this.formSeguroAdicionalDisabled = true
          }

          Swal.fire({
            title: 'Seguro Adicional ¡Registrado!',
            text: 'EL Seguro Adicional se registró con ¡Exito!',
            icon: 'success',
            showConfirmButton: true,
          });

          this.router.navigate(["/seguro-adicional/list-seguros-adicionales"]);

        },
        error: err =>{
          console.error(err);
        }
      })
  }

  volver(){
    this.router.navigate(["/seguro-adicional/list-seguros-adicionales"]);
  }

}
