import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from 'src/app/models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolEmmiter = new EventEmitter<string>();

  private URL = "http://localhost:3000/roles/";

  constructor(private http: HttpClient) { }

  createRol(rol: Rol): Observable<Object>{
    return this.http.post<Object>(this.URL, rol);
  }

  getListRoles(): Observable<Rol[]>{
    return this.http.get<Rol[]>(this.URL);
  }

  getRol(id: string): Observable<Rol>{
    return this.http.get<Rol>(this.URL + id);
  }

  editRol(id: string, rol: Rol): Observable<Rol>{
    return this.http.put<Rol>(this.URL + id, rol);
  }

  deleteRol(id: string): Observable<any>{
    return this.http.delete(this.URL + id);
  }


}
