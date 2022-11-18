import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repuesto } from 'src/app/models/repuesto';

@Injectable({
  providedIn: 'root'
})
export class RepuestoService {

  private URL = "http://localhost:3000/repuestos/";

  constructor(private http: HttpClient) { }

  createRepuesto(repuesto: Repuesto): Observable<Object>{
    return this.http.post<Object>(this.URL , repuesto)
  }

  getListRepuestos(): Observable<Repuesto[]>{
    return this.http.get<Repuesto[]>(this.URL)
  }

  getRepuesto(id: string): Observable<Repuesto>{
    return this.http.get<Repuesto>(this.URL + id);
  }

  editRepuesto(id: string, repuesto: Repuesto): Observable<Repuesto>{
    return this.http.put<Repuesto>(this.URL + id, repuesto);
  }

  deleteRepuesto(id: string): Observable<any>{
    return this.http.delete(this.URL + id);
  }
}
