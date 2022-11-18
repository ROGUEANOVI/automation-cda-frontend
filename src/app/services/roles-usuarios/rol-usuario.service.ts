import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class RolUsuarioService {

  constructor(private http: HttpClient) { }

  createRolUsuario(idRol: string, usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`http://localhost:3000/roles/${idRol}/usuarios`, usuario);
  }

  getRolUsuarios(idRol: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`http://localhost:3000/roles/${idRol}/usuarios`);
  }

  editRolUsuario(idRol: string, usuario: Usuario): Observable<any>{
    return this.http.patch(`http://localhost:3000/roles/${idRol}/usuarios`, usuario);
  }

  deleteRolUsuario(idRol: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/roles/${idRol}/usuarios`);
  }
}
