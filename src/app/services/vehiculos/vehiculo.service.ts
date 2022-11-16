import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehiculo } from 'src/app/models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {

  private URL = "http://localhost:3000/vehiculos/";

  constructor(private http: HttpClient) { }

  createVehiculo(vehiculo: Vehiculo): Observable<Object>{
    return this.http.post<Object>(this.URL , vehiculo)
  }

  getListVehiculos(): Observable<Vehiculo[]>{
    return this.http.get<Vehiculo[]>(this.URL)
  }

  getVehiculo(id: string): Observable<Vehiculo>{
    return this.http.get<Vehiculo>(this.URL + id);
  }

  editVehiculo(id: string, vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.put<Vehiculo>(this.URL + id, vehiculo);
  }

  deleteVehiculo(id: string): Observable<any>{
    return this.http.delete(this.URL + id);
  }

}
