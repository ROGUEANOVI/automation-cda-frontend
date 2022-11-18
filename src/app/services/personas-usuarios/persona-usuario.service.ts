import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class PersonaUsuarioService {

  constructor(private http: HttpClient) { }

  createPersonaUsuario(idPersona: string, usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`http://localhost:3000/personas/${idPersona}/usuario`, usuario);
  }

  getPersonaUsuarios(idPersona: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`http://localhost:3000/personas/${idPersona}/usuario`);
  }

  editPersonaUsuario(idPersona: string, usuario: Usuario): Observable<any>{
    return this.http.patch(`http://localhost:3000/personas/${idPersona}/usuario`, usuario);
  }

  deletePersonaUsuario(idPersona: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/personas/${idPersona}/usuario`);
  }
}
