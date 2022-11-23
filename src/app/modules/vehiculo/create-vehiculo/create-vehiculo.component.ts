import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculos/vehiculo.service';
import { UsuarioVehiculoService } from 'src/app/services/usuarios-vehiculos/usuario-vehiculo.service';

@Component({
  selector: 'app-create-vehiculo',
  templateUrl: './create-vehiculo.component.html',
  styleUrls: ['./create-vehiculo.component.css']
})
export class CreateVehiculoComponent implements OnInit {

  formVehiculo: FormGroup;
  vehiculoCreated = new Array<string>();
  formVehiculoDisabled: boolean;
  _idUsuario!: string;


  constructor(private fb: FormBuilder , private vehiculoService: VehiculoService, private usuarioVehiculoService: UsuarioVehiculoService, private router: Router, private aRouter: ActivatedRoute) {

    this.formVehiculo = this.fb.group({
      placa: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^([A-Z]{3}-[0-9]{3})|([A-Z]{3}-[0-9]{2}[A-Z]{1})+$')]],
      marca: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      modelo: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
      numeroPasajeros: ["", [Validators.required, Validators.min(2), Validators.max(50)]],
      cilindrajeMotor: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      estadoSoat: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    });
    this.formVehiculoDisabled = false;
    this._idUsuario = this.aRouter.snapshot.paramMap.get("idUsuario")!;
  }

  ngOnInit(): void {
  }

  handleCreateVehiculo(){
    if (this._idUsuario === null){
      this.createVehiculo();
    }
    else{
      this.createUsuarioVehiculo();
    }
  }

  createVehiculo(){
    const vehiculo: Vehiculo = {
      placa: this.formVehiculo.get("placa")?.value,
      marca: this.formVehiculo.get("marca")?.value,
      modelo: this.formVehiculo.get("modelo")?.value,
      numeroPasajeros: this.formVehiculo.get("numeroPasajeros")?.value,
      cilindrajeMotor: this.formVehiculo.get("cilindrajeMotor")?.value,
      estadoSoat: this.formVehiculo.get("estadoSoat")?.value,
    }

    this.vehiculoService.createVehiculo(vehiculo)
      .subscribe({
        next:  res => {
          console.log(res);
          this.vehiculoCreated = Object.values(res);
          console.log(this.vehiculoCreated[0]);
          if (this.vehiculoCreated[0] === vehiculo.placa) {
            Swal.fire({
              title: 'Placa ¡Invalida!',
              text: `Ya existe un vehiculo registrado con placa: ${vehiculo.placa}` ,
              icon: 'info',
              showConfirmButton: true,
            });
          }
          else {

            this.formVehiculo.reset();
            this.formVehiculo.disable();
            if(this.formVehiculo.disabled){
              this.formVehiculoDisabled = true
            }

            this.router.navigate(["/vehiculo/list-vehiculos"]);
            
            Swal.fire({
              title: 'Vehiculo ¡Registrado!',
              text: 'Vehiculo registrado con ¡Exito!',
              icon: 'success',
              showConfirmButton: true,
            });
            
          }
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  createUsuarioVehiculo(){
    const vehiculo: Vehiculo = {
      placa: this.formVehiculo.get("placa")?.value,
      marca: this.formVehiculo.get("marca")?.value,
      modelo: this.formVehiculo.get("modelo")?.value,
      numeroPasajeros: this.formVehiculo.get("numeroPasajeros")?.value,
      cilindrajeMotor: this.formVehiculo.get("cilindrajeMotor")?.value,
      estadoSoat: this.formVehiculo.get("estadoSoat")?.value,
    }

    this.usuarioVehiculoService.createUsuarioVehiculo(this._idUsuario, vehiculo)
      .subscribe({
        next:  res => {
          console.log(res);
          this.vehiculoCreated = Object.values(res);
          console.log(this.vehiculoCreated[0]);
          this.formVehiculo.reset();
          this.formVehiculo.disable();
          if(this.formVehiculo.disabled){
            this.formVehiculoDisabled = true
          }

          Swal.fire({
            title: 'Vehiculo ¡Registrado!',
            text: 'Vehiculo registrado con ¡Exito!',
            icon: 'success',
            showConfirmButton: true,
          });
          
          if(this._idUsuario !== null){
            this.router.navigate(["/vehiculo/list-vehiculos", this._idUsuario]);
          }
          else{
            this.router.navigate(["/vehiculo/list-vehiculos"]);
          }

        },
        error: err =>{
          console.error(err);
        }
      })
  }

  volver(){
    if(this._idUsuario !== null){
      this.router.navigate(["/vehiculo/list-vehiculos", this._idUsuario]);
    }
    else{
      this.router.navigate(["/vehiculo/list-vehiculos"]);
    }
  }
}
