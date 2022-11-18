import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Revision } from 'src/app/models/revision';
import { RevisionService } from 'src/app/services/revisiones/revision.service';
@Component({
  selector: 'app-edit-revision',
  templateUrl: './edit-revision.component.html',
  styleUrls: ['./edit-revision.component.css']
})
export class EditRevisionComponent implements OnInit {

  formRevision: FormGroup;
  id: string;
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
    this._idVehiculo = this.aRouter.snapshot.paramMap.get("idVehiculo")!;
    this.id = this.aRouter.snapshot.paramMap.get("id")!;
   }

   ngOnInit(): void {
    this.loadDataForm();
  }

  editRevision(){

    const revision: Revision = {
      fechaRevision: new Date(this.formRevision.get("fechaRevision")?.value),
      nivelAceite: this.formRevision.get("nivelAceite")?.value,
      nivelFrenos: this.formRevision.get("nivelFrenos")?.value,
      nivelRefrigerante: this.formRevision.get("nivelRefrigerante")?.value,
      nivelDireccion: this.formRevision.get("nivelRefrigerante")?.value,
      idVehiculo: this._idVehiculo === null ? this.formRevision.get("idVehiculo")?.value : this._idVehiculo  
    }
    this.revisionService.editRevision(this.id, revision)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formRevision.reset();
          if(this._idVehiculo !== null){
            this.router.navigate(["/revision/list-revisiones", this._idVehiculo]);
          }
          else{
            this.router.navigate(["/revision/list-revisiones"]);
          }

          Swal.fire({
            title: 'Revision ¡Actualizada!',
            text: 'Revision actualizada con ¡Exito!',
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
      
      this.revisionService.getRevision(this.id).subscribe(
        res => {
          const fecha = (res.fechaRevision).toLocaleString().split("T");
          this.formRevision.setValue({
            fechaRevision: fecha[0],
            nivelAceite: res.nivelAceite,
            nivelFrenos:res.nivelFrenos,
            nivelRefrigerante: res.nivelRefrigerante,
            nivelDireccion: res.nivelDireccion,
            idVehiculo: res.idVehiculo
          });
        }
      );
    }
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
