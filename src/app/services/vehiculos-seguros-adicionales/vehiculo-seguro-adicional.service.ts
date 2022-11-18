import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguroAdicional } from 'src/app/models/seguroadicional';

@Injectable({
  providedIn: 'root'
})
export class VehiculoSeguroAdicionalService {

  constructor(private http: HttpClient) { }

  createVehiculoSeguroAdicional(idVehiculo: string, seguroAdicional: SeguroAdicional): Observable<SeguroAdicional>{
    return this.http.post<SeguroAdicional>(`http://localhost:3000/vehiculos/${idVehiculo}/seguros-adicionales`, seguroAdicional);
  }

  getVehiculoSegurosAdicionales(idVehiculo: string): Observable<SeguroAdicional[]>{
    return this.http.get<SeguroAdicional[]>(`http://localhost:3000/vehiculos/${idVehiculo}/seguros-adicionales`);
  }

  editVehiculoSeguroAdicional(idVehiculo: string, seguroAdicional: SeguroAdicional): Observable<any>{
    return this.http.patch(`http://localhost:3000/vehiculos/${idVehiculo}/seguros-adicionales`, seguroAdicional);
  }

  deleteVehiculoSeguroAdicional(idVehiculo: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/vehiculos/${idVehiculo}/seguros-adicionales`);
  }
}
