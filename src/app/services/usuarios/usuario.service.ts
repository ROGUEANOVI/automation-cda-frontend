import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private URL = "http://localhost:3000";

  constructor(private http: HttpClient, private router: Router) { }

  createUsuario(usuario: Usuario): Observable<any>{
    return this.http.post(this.URL + "/roles", usuario);
  }

}
