import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from 'src/app/models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class UsuarioVehiculoService {
  
  constructor(private http: HttpClient) { }

  createUsuarioVehiculo(idUsuario: string, vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(`http://localhost:3000/usuarios/${idUsuario}/vehiculos`, vehiculo);
  }

  getUsuarioVehiculos(idUsuario: string): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`http://localhost:3000/usuarios/${idUsuario}/vehiculos`);
  }

  editUsuarioVehiculo(idUsuario: string, vehiculo: Vehiculo): Observable<any>{
    return this.http.patch(`http://localhost:3000/usuarios/${idUsuario}/vehiculos`, vehiculo);
  }

  deleteUsuarioVehiculo(idUsuario: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/usuarios/${idUsuario}/vehiculos`);
  }
}
