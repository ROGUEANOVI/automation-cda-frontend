import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = "http://localhost:3000/usuarios/";

  constructor(private http: HttpClient, private router: Router) { }

  createUsuario(usuario: Usuario): Observable<Object>{
    return this.http.post<Object>(this.URL, usuario);
  }

  getListUsuarios(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.URL)
  }

  getUsuario(id: string): Observable<Usuario>{
    return this.http.get<Usuario>(this.URL + id);
  }

  editUsuario(id: string, usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.URL + id, usuario);
  }

  deleteUsuario(id: string): Observable<any>{
    return this.http.delete(this.URL + id);
  }

}
