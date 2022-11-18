import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class VehiculoUsuarioService {

  constructor(private http: HttpClient) { }

  createVehiculoUsuario(idVehiculo: string, usuario: Usuario): Observable<Usuario>{
    return this.http.post<Usuario>(`http://localhost:3000/vehiculos/${idVehiculo}/usuarios`, usuario);
  }

  getVehiculoUsuarios(idVehiculo: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(`http://localhost:3000/vehiculos/${idVehiculo}/usuarios`);
  }

  editUsuarioVehiculo(idVehiculo: string, usuario: Usuario): Observable<any>{
    return this.http.patch(`http://localhost:3000/vehiculos/${idVehiculo}/usuarios`, usuario);
  }

  deleteUsuarioVehiculo(idVehiculo: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/vehiculos/${idVehiculo}/usuarios`);
  }
}
