import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from 'src/app/models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class SeguroAdicionalVehiculoService {

  constructor(private http: HttpClient) { }

  createSeguroAdicionalVehiculo(idSeguroAdicional: string, vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(`http://localhost:3000/seguros-adicionales/${idSeguroAdicional}/vehiculos`, vehiculo);
  }

  getSeguroAdicionalVehiculos(idSeguroAdicional: string): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(`http://localhost:3000/seguros-adicionales/${idSeguroAdicional}/vehiculos`);
  }

  editSeguroAdicionalVehiculo(idSeguroAdicional: string, vehiculo: Vehiculo): Observable<any>{
    return this.http.patch(`http://localhost:3000/seguros-adicionales/${idSeguroAdicional}/vehiculos`, vehiculo);
  }

  deleteSeguroAdicionalVehiculo(idSeguroAdicional: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/seguros-adicionales/${idSeguroAdicional}/vehiculos`);
  }
}
