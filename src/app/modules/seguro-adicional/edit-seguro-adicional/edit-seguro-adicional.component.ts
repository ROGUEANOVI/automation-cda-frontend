import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SeguroAdicional } from 'src/app/models/seguroadicional';
import { SeguroAdicionalService } from 'src/app/services/seguros-adicionales/seguro-adicional.service';

@Component({
  selector: 'app-edit-seguro-adicional',
  templateUrl: './edit-seguro-adicional.component.html',
  styleUrls: ['./edit-seguro-adicional.component.css']
})
export class EditSeguroAdicionalComponent implements OnInit {

  formSeguroAdicional: FormGroup;
  id: string;

  constructor(private fb: FormBuilder , private seguroAdicionalService: SeguroAdicionalService, private router: Router, private aRouter: ActivatedRoute) { 
    this.formSeguroAdicional = this.fb.group({
      tipo: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      fechaVencimiento: ["", [Validators.required]]
    });
    this.id = this.aRouter.snapshot.paramMap.get("id")!;
  }

  ngOnInit(): void {
    this.loadDataForm();
  }

  editSeguroAdicional(){

    const seguroadicional: SeguroAdicional = {
      tipo: this.formSeguroAdicional.get("tipo")?.value,
      fechaVencimiento: new Date(this.formSeguroAdicional.get("fechaVencimiento")?.value)
    }
    this.seguroAdicionalService.editSeguroAdicional(this.id, seguroadicional)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formSeguroAdicional.reset();
          this.router.navigate(["/seguro-adicional/list-seguros-adicionales"]);

          Swal.fire({
            title: 'Seguro Adicional ¡Actualizado!',
            text: 'Seguro adicional actualizado con ¡Exito!',
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
      
      this.seguroAdicionalService.getSeguroAdicional(this.id).subscribe(
        res => {
          const fecha = (res.fechaVencimiento).toLocaleString().split("T");
          this.formSeguroAdicional.setValue({
            tipo: res.tipo,
            fechaVencimiento: fecha[0]
          });
        }
      );
    }
  }

  volver(){
    this.router.navigate(["/seguro-adicional/list-seguros-adicionales"]);
  }

}
