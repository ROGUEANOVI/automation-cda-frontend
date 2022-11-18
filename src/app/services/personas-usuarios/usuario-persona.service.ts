import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona';

@Injectable({
  providedIn: 'root'
})
export class UsuarioPersonaService {

  constructor(private http: HttpClient) { }

  createUsuarioPersona(idUsuario: string, persona: Persona): Observable<Persona>{
    return this.http.post<Persona>(`http://localhost:3000/usuarios/${idUsuario}/persona`, persona);
  }

  getUsuarioPersonas(idUsuario: string): Observable<Persona[]>{
    return this.http.get<Persona[]>(`http://localhost:3000/usuarios/${idUsuario}/persona`);
  }

  editUsuarioPersona(idUsuario: string, persona: Persona): Observable<any>{
    return this.http.patch(`http://localhost:3000/usuarios/${idUsuario}/persona`, persona);
  }

  deleteUsuarioPersona(idUsuario: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/usuarios/${idUsuario}/persona`);
  }
}
