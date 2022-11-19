import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Revision } from 'src/app/models/revision';
import { RevisionService } from 'src/app/services/revisiones/revision.service';

@Component({
  selector: 'app-create-revision',
  templateUrl: './create-revision.component.html',
  styleUrls: ['./create-revision.component.css']
})
export class CreateRevisionComponent implements OnInit {

  formRevision: FormGroup;
  revisionCreated = new Array<string>();
  formRevisionDisabled: boolean;
  _idVehiculo: string;

  constructor(private fb: FormBuilder , private revisionService: RevisionService, private router: Router, private aRouter: ActivatedRoute) { 
    this.formRevision = this.fb.group({
      fechaRevision: ["", [Validators.required]],
      nivelAceite: ["Seleccione el nivel de aceite del motor", [Validators.required]],
      nivelFrenos: ["Seleccione el nivel de liquido de frenos", [Validators.required]],
      nivelRefrigerante: ["Seleccione el nivel de refrigerante", [Validators.required]],
      nivelDireccion: ["Seleccione el nivel de aceite de la dirreccion", [Validators.required]],
      idVehiculo: ["", [Validators.required, Validators.minLength(24), Validators.maxLength(24)]]
    });
    this.formRevisionDisabled = false;
    this._idVehiculo = this.aRouter.snapshot.paramMap.get("idVehiculo")!;
  }

  ngOnInit(): void {
    this.loadIdVehiculo()
  }

  createRevision(){

    const revision: Revision = {
      fechaRevision: new Date(this.formRevision.get("fechaRevision")?.value),
      nivelAceite: this.formRevision.get("nivelAceite")?.value,
      nivelFrenos: this.formRevision.get("nivelFrenos")?.value,
      nivelRefrigerante: this.formRevision.get("nivelRefrigerante")?.value,
      nivelDireccion: this.formRevision.get("nivelDireccion")?.value,
      idVehiculo: this._idVehiculo === null ? this.formRevision.get("idVehiculo")?.value : this._idVehiculo  
    }

    this.revisionService.createRevision(revision)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formRevision.reset();
          this.formRevision.disable();
          if(this.formRevision.disabled){
            this.formRevisionDisabled = true
          }

          if(this._idVehiculo !== null){
            this.router.navigate(["/revision/list-revisiones", this._idVehiculo]);
          }
          else{
            this.router.navigate(["/revision/list-revisiones"]);
          }

          Swal.fire({
            title: 'Revision ¡Registrada!',
            text: 'La revision se registró con ¡Exito!',
            icon: 'success',
            showConfirmButton: true,
          });

        },
        error: err =>{
          console.error(err);
        }
      })
  }

  loadIdVehiculo(){
    this.formRevision.patchValue({
      idVehiculo: this._idVehiculo
    });
  }

  volver(){
    if(this._idVehiculo !== null){
      this.router.navigate(["/revision/list-revisiones", this._idVehiculo]);
    }
    else{
      this.router.navigate(["/revision/list-revisiones"]);
    }
  }

}
