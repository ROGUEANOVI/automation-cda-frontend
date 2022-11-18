import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from 'src/app/models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class RevisionVehiculoService {

  constructor(private http: HttpClient) { }

  getRevisionVehiculos(idVehiculo: string): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`http://localhost:3000/revisiones/${idVehiculo}/vehiculo`);
  }
}
