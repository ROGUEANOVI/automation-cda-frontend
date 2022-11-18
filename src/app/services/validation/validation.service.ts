import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Credenciales } from 'src/app/models/credenciales';
import { Usuario } from 'src/app/models/usuario';


@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  private URL = "http://localhost:3000";

  constructor( private http: HttpClient, private router: Router) { }

  signUp(usuario: Usuario): Observable<Object>{
    return this.http.post<Object>(this.URL + "/usuarios-registro", usuario);
  }


  logIn(credenciales: Credenciales): Observable<object>{
    return this.http.post<object>(this.URL + "/usuarios-validacion", credenciales);
  }

  loggedIn(){
    return !!localStorage.getItem("token"); 
  }

  logOut(){
    localStorage.removeItem("token");
    this.router.navigate(["/validation/login"]);
  }

  getToken(){
    return localStorage.getItem("token");
  }
}
