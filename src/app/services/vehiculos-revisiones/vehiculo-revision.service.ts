import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revision } from 'src/app/models/revision';

@Injectable({
  providedIn: 'root'
})
export class VehiculoRevisionService {

  constructor(private http: HttpClient) { }

  createVehiculoRevision(idVehiculo: string, revision: Revision): Observable<Revision>{
    return this.http.post<Revision>(`http://localhost:3000/vehiculos/${idVehiculo}/revisiones`, revision);
  }

  getVehiculoRevisiones(idVehiculo: string): Observable<Revision[]>{
    return this.http.get<Revision[]>(`http://localhost:3000/vehiculos/${idVehiculo}/revisiones`);
  }

  editVehiculoRevision(idVehiculo: string, revision: Revision): Observable<any>{
    return this.http.patch(`http://localhost:3000/vehiculos/${idVehiculo}/revisiones`, revision);
  }

  deleteVehiculoRevision(idVehiculo: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/vehiculos/${idVehiculo}/revisiones`);
  }
}
