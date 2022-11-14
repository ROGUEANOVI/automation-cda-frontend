import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Credenciales } from 'src/app/models/credenciales';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formCredenciales: FormGroup;

  
  constructor(private fb: FormBuilder , private validationService: ValidationService, private router: Router) { 
    this.formCredenciales = this.fb.group({
      _nombreUsuario: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      _clave: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
  }

  
  logIn(){
    const credenciales: Credenciales = {
      _nombreUsuario: this.formCredenciales.get("_nombreUsuario")?.value,
      _clave: this.formCredenciales.get("_clave")?.value
    }
    this.validationService.logIn(credenciales)
      .subscribe({
        next:  res => {
          console.log(res);
          localStorage.setItem("token", res.token);
          Swal.fire({
            title: 'Inicio De Sesión',
            text: 'El Usuario A Iniciado Sesión con Exito',
            icon: 'success',
            showConfirmButton: true,
          });
          this.router.navigate(["/vehiculos"]);
        },
        error: err =>{
          console.error(err);
          Swal.fire({
            title: 'Usuario ¡Invalido!',
            text: 'El nombre de usuario o la contraseña es ¡Incorrecto(a)!',
            icon: 'error',
            showConfirmButton: true,
          });
        }
      })
  }

}
