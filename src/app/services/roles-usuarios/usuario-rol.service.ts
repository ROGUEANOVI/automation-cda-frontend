import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/models/rol';


@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {

  constructor(private http: HttpClient) { }

  // createUsuarioRol(idUsuario: string, rol: Rol): Observable<Rol>{
  //   return this.http.post<Rol>(`http://localhost:3000/usuarios/${idUsuario}/roles`, rol);
  // }

  getUsuarioRoles(idUsuario: string): Observable<Rol[]>{
    return this.http.get<Rol[]>(`http://localhost:3000/usuarios/${idUsuario}/rol`);
  }

  // editUsuarioRol(idUsuario: string, rol: Rol): Observable<any>{
  //   return this.http.patch(`http://localhost:3000/usuarios/${idUsuario}/roles`, rol);
  // }

  // deleteUsuarioRol(idUsuario: string): Observable<any>{
  //   return this.http.delete(`http://localhost:3000/usuarios/${idUsuario}/roles`);
  // }
}
