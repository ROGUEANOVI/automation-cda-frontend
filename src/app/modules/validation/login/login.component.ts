import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Credenciales } from 'src/app/models/credenciales';
import Swal from 'sweetalert2';
import { RolService } from 'src/app/services/roles/rol.service';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menus/menu.service';
import { Rol } from 'src/app/models/rol';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formCredenciales: FormGroup;
  rol!: string;
  
  constructor(private fb: FormBuilder , private validationService: ValidationService, private rolService: RolService, private menuService: MenuService, private router: Router) { 
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
          Swal.fire({
            title: 'Inicio De Sesión',
            text: 'El Usuario ha iniciado sesión con ¡Exito!',
            icon: 'success',
            showConfirmButton: true,
          });
          console.log(res);
          const token = Object.values(res)[3];
          localStorage.setItem("token", token);

          const idUsuario:any = Object.values(Object.values(res)[0])[0];
          localStorage.setItem("idUsuario", idUsuario);
          
          const nombreUsuario:any = Object.values(Object.values(res)[0])[1];
          localStorage.setItem("nombreUsuario", nombreUsuario);

          const idRol:any = Object.values(Object.values(res)[0])[4];
          localStorage.setItem("idRol", idRol);

          // this.setRol(idRol);

          this.rolService.getRol(idRol).subscribe({
            next: (res) => {
              const rol = Object.values(res)[1];
              console.log("rol:", rol);
              localStorage.setItem("rol", rol);
              this.rolService.rolEmmiter.emit(rol);
              this.generateMenus(rol);
              this.router.navigate(["/vehiculo/list-vehiculos", idUsuario]);
            },
            error: (err) => {
              console.log(err); 
            }
          });

          // this.router.navigate(["/vehiculo/list-vehiculos", idUsuario]);
          
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

  // setRol(id: string){
  //   this.rolService.getRol(id).subscribe({
  //     next: (res) => {
  //       const rol = Object.values(res)[1];
  //       console.log("rol:", rol);
  //       localStorage.setItem("rol", rol);
  //       this.rolService.rolEmmiter.emit(rol);
  //       this.generateMenus(rol);
  //     },
  //     error: (err) => {
  //       console.log(err); 
  //     }
  //   });
  // }


  generateMenus(rol: string){
    const menus = new Array<Menu>();
    
    if(rol === "AUXILIAR"){
      menus.push({"nombre": "Personas", "patch": "/persona/list-personas"});
      menus.push({"nombre": "Roles", "patch": "/rol/list-roles"});
      menus.push({"nombre": "Usuarios", "patch": "/usuario/list-usuarios"});
      menus.push({"nombre": "Vehiculos", "patch": "/vehiculo/list-vehiculos"});
      menus.push({"nombre": "Seguros Adicionales", "patch": "/seguro-adicional/list-seguros-adicionales"});
      menus.push({"nombre": "Revisiones", "patch": "/revision/list-revisiones"});
      menus.push({"nombre": "Repuestos", "patch": "/repuesto/list-repuestos"});
      this.menuService.menuEmmiter.emit(menus);
      return menus;
    }
    
    if (rol === "PROPIETARIO") {
      menus.push({"nombre": "Vehiculos", "patch": "/vehiculo/list-vehiculos"});
      menus.push({"nombre": "Seguros Adicionales", "patch": "/seguro-adicional/list-seguros-adicionales"});
      this.menuService.menuEmmiter.emit(menus);
      return menus;
    }
    
    if (rol === "MECANICO"){
      menus.push({"nombre": "Vehiculos", "patch": "/vehiculo/list-vehiculos"});
      menus.push({"nombre": "Revisiones", "patch": "/revision/list-revisiones"});
      menus.push({"nombre": "Repuestos", "patch": "/repuesto/list-repuestos"});
      menus.push({"nombre": "Registrar vehiculo", "patch": "/vehiculo/create-vehiculo"});
      this.menuService.menuEmmiter.emit(menus);
      return menus;
    }
    
    if(rol === "JEFE-OPERACION"){
      menus.push({"nombre": "Personas", "patch": "/persona/list-personas"});
      menus.push({"nombre": "Roles", "patch": "/rol/list-roles"});
      menus.push({"nombre": "Usuarios", "patch": "/usuario/list-usuarios"});
      menus.push({"nombre": "Vehiculos", "patch": "/vehiculo/list-vehiculos"});
      menus.push({"nombre": "Seguros Adicionales", "patch": "/seguro-adicional/list-seguros-adicionales"});
      menus.push({"nombre": "Revisiones", "patch": "/revision/list-revisiones"});
      menus.push({"nombre": "Repuestos", "patch": "/repuesto/list-repuestos"});
      this.menuService.menuEmmiter.emit(menus);
      return menus;
    }
    return []
  }  
}

   
            

