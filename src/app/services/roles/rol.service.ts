import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  createRol(rol: Rol): Observable<Object>{
    return this.http.post<Object>(this.URL + "/roles", rol);
  }
}
