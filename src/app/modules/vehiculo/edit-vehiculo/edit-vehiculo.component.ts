import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculos/vehiculo.service';

@Component({
  selector: 'app-edit-vehiculo',
  templateUrl: './edit-vehiculo.component.html',
  styleUrls: ['./edit-vehiculo.component.css']
})
export class EditVehiculoComponent implements OnInit {

  formVehiculo: FormGroup;
  _idUsuario: string;
  _id: string;

  constructor(private fb: FormBuilder , private vehiculoService: VehiculoService, private router: Router, private aRouter: ActivatedRoute) {

    this.formVehiculo = this.fb.group({
      placa: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^([A-Z]{3}-[0-9]{3})|([A-Z]{3}-[0-9]{2}[A-Z]{1})+$')]],
      marca: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      modelo: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      numeroPasajeros: ["", [Validators.required, Validators.min(2), Validators.max(50)]],
      cilindrajeMotor: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      estadoSoat: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    });
    this._idUsuario = this.aRouter.snapshot.paramMap.get("idUsuario")!;
    this._id = this.aRouter.snapshot.paramMap.get("id")!;
  }
  
  ngOnInit(): void {
    this.loadDataForm();
  }

  editVehiculo(){
    const vehiculo: Vehiculo = {
      placa: this.formVehiculo.get("placa")?.value,
      marca: this.formVehiculo.get("marca")?.value,
      modelo: this.formVehiculo.get("modelo")?.value ,
      numeroPasajeros: this.formVehiculo.get("numeroPasajeros")?.value,
      cilindrajeMotor: this.formVehiculo.get("cilindrajeMotor")?.value,
      estadoSoat: this.formVehiculo.get("estadoSoat")?.value,
    }

    this.vehiculoService.editVehiculo(this._id, vehiculo)
      .subscribe({
        next:  res => {
          console.log(res);
          this.formVehiculo.reset();

          if (this._idUsuario === null) {
            this.router.navigate(["/vehiculo/list-vehiculos"]);
          } else {
            this.router.navigate(["/vehiculo/list-vehiculos", this._idUsuario]);
          }
          

          Swal.fire({
            title: 'Datos del vehiculo ¡Actualizados!',
            text: 'Datos del vehiculo actualizados con ¡Exito!',
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
    if(this._id !== null){
      
      this.vehiculoService.getVehiculo(this._id).subscribe(
        res => {
          this.formVehiculo.setValue({
            placa: res.placa,
            marca: res.marca,
            modelo: res.modelo,
            numeroPasajeros: res.numeroPasajeros,
            cilindrajeMotor: res.cilindrajeMotor,
            estadoSoat: res.estadoSoat,
          });
        }
      );
    }
  }

  volver(){
    if (this._idUsuario === null) {
      this.router.navigate(["/vehiculo/list-vehiculos"]);
    } else {
      this.router.navigate(["/vehiculo/list-vehiculos", this._idUsuario]);
    }
  }

}
