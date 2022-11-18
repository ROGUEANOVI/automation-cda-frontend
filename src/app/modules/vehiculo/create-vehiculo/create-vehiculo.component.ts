import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Vehiculo } from 'src/app/models/vehiculo';
import { VehiculoService } from 'src/app/services/vehiculos/vehiculo.service';

@Component({
  selector: 'app-create-vehiculo',
  templateUrl: './create-vehiculo.component.html',
  styleUrls: ['./create-vehiculo.component.css']
})
export class CreateVehiculoComponent implements OnInit {

  formVehiculo: FormGroup;
  vehiculoCreated = new Array<string>();
  formVehiculoDisabled: boolean;

  constructor(private fb: FormBuilder , private vehiculoService: VehiculoService, private router: Router) {

    this.formVehiculo = this.fb.group({
      placa: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(7), Validators.pattern('^([A-Z]{3}-[0-9]{3})|([A-Z]{3}-[0-9]{2}[A-Z]{1})+$')]],
      marca: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      modelo: ["", [Validators.required, Validators.min(1950), Validators.max(2023)]],
      numeroPasajeros: ["", [Validators.required, Validators.min(2), Validators.max(50)]],
      cilindrajeMotor: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      estadoSoat: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(7)]],
    });
    this.formVehiculoDisabled = false;
  }

  ngOnInit(): void {
  }

  createVehiculo(){
    const vehiculo: Vehiculo = {
      placa: this.formVehiculo.get("cedula")?.value,
      marca: this.formVehiculo.get("nombre")?.value,
      modelo: this.formVehiculo.get("apellidos")?.value,
      numeroPasajeros: this.formVehiculo.get("telefono")?.value,
      cilindrajeMotor: this.formVehiculo.get("correo")?.value,
      estadoSoat: this.formVehiculo.get("direccion")?.value,
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

            Swal.fire({
              title: 'Datos personales ¡Registrados!',
              text: 'Datos personales registrados con ¡Exito!',
              icon: 'success',
              showConfirmButton: true,
            });
            
            this.router.navigate(["/vehiculo/list-vehiculos"]);
          }
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  volver(){
    this.router.navigate(["/vehiculo/list-vehiculos"]);
  }
}
