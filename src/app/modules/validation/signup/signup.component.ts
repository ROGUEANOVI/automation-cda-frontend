import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ValidationService } from 'src/app/services/validation/validation.service';
import { Persona } from 'src/app/models/persona';
import { Rol } from 'src/app/models/rol';
import { PersonaService } from 'src/app/services/personas/persona.service';
import { RolService } from 'src/app/services/roles/rol.service';
import { Usuario } from 'src/app/models/usuario';
import Swal from 'sweetalert2';
import { Menu } from 'src/app/models/menu';
import { MenuService } from 'src/app/services/menus/menu.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  formPersona: FormGroup;
  formUsuario: FormGroup;
  personaCreated = new Array<string>();
  rolCreated = new Array<string>();
  rolesList = new Array<Rol>();
  usuarioExists = new Array<string>();
  formPersonaDisabled: boolean;

  constructor(private fb: FormBuilder , private personaService: PersonaService, private rolService: RolService, public validateService: ValidationService , private menuService: MenuService, private router: Router) {

    this.formPersona = this.fb.group({
      cedula: ["", [Validators.required, Validators.minLength(7), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      nombre: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      apellidos: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      telefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern("^[0-9]+$")]],
      correo: ["", [Validators.required, Validators.email]],
      direccion: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(40)]],
      nivelEstudios: ["Seleccione su nivel de estudios"],
    });

    this.formUsuario = this.fb.group({
      tipoUsuario: ["Seleccione el tipo de usuario"],
      nombreUsuario: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      clave: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(20)]]
    });

    this.formPersonaDisabled = false;
  }

  ngOnInit(): void {
  }

  createPersona () {

    const persona: Persona = {
      cedula: this.formPersona.get("cedula")?.value,
      nombre: this.formPersona.get("nombre")?.value,
      apellidos: this.formPersona.get("apellidos")?.value,
      telefono: this.formPersona.get("telefono")?.value,
      correo: this.formPersona.get("correo")?.value,
      direccion: this.formPersona.get("direccion")?.value,
      nivelEstudios: this.formPersona.get("nivelEstudios")?.value,
    }

    this.personaService.createPersona(persona)
      .subscribe({
        next:  res => {
          console.log(res);
          this.personaCreated = Object.values(res);
          console.log(this.personaCreated[0]);
          if (this.personaCreated[0] === persona.cedula) {
            Swal.fire({
              title: 'Cedula ¡Invalida!',
              text: `Ya existe una persona registrado con cedula: ${persona.cedula}` ,
              icon: 'info',
              showConfirmButton: true,
            });
          }
          else {

            this.formPersona.reset();
            this.formPersona.disable();
            if(this.formPersona.disabled){
              this.formPersonaDisabled = true
            }

            Swal.fire({
              title: 'Datos personales ¡Registrados!',
              text: 'Datos personales registrados con ¡Exito!',
              icon: 'success',
              showConfirmButton: true,
            });

            this.listRoles();
            
          }
        },
        error: err =>{
          console.error(err);
        }
      })
  }

  listRoles(){
    this.rolService.getListRoles()
    .subscribe({
      next: res => {
        console.log(res);
        this.rolesList = res;
      },
      error: err => {
        console.error(err);
      }

    });
  }

 
  signUp(){
    
    const usuario: Usuario = {
      nombreUsuario: this.formUsuario.get("nombreUsuario")?.value,
      clave: this.formUsuario.get("clave")?.value,
      idPersona: this.personaCreated[0],
      idRol: this.formUsuario.get("tipoUsuario")?.value
    }

    this.validateService.signUp(usuario)
      .subscribe({
        next: res => {
          console.log(res);
          this.usuarioExists = Object.values(res);
          console.log(this.usuarioExists[0]);
          
          if (this.usuarioExists[0] === usuario.nombreUsuario) {
            Swal.fire({
              title: 'Nombre de usuario ¡Invalido!',
              text: `Ya existe un usuario registrado como: ${usuario.nombreUsuario}` ,
              icon: 'info',
              showConfirmButton: true,
            });
          }
          else {
            Swal.fire({
              title: 'Usuario Registrado',
              text: 'Usuario Registrado ¡Exitosamente!',
              icon: 'success',
              showConfirmButton: true,
            });
            
            const token:any = Object.values(res)[2];
            localStorage.setItem("token", token);

            const idUsuario:any = Object.values(Object.values(res)[0])[0];
            localStorage.setItem("idUsuario", idUsuario);
            
            const nombreUsuario:any = Object.values(Object.values(res)[0])[1];
            localStorage.setItem("nombreUsuario", nombreUsuario);

            const idRol:any = Object.values(Object.values(res)[0])[4];
            localStorage.setItem("idRol", idRol);

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

          }
          
        },
        error: err =>{
          console.error(err);
        }
      })
  }

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
