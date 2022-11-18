import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revision } from 'src/app/models/revision';

@Injectable({
  providedIn: 'root'
})
export class RepuestoRevisionService {

  constructor(private http: HttpClient) { }

  createRepuestoRevision(idRepuesto: string, revision: Revision): Observable<Revision>{
    return this.http.post<Revision>(`http://localhost:3000/repuestos/${idRepuesto}/revisiones`, revision);
  }

  getRepuestoRevisiones(idRepuesto: string): Observable<Revision[]>{
    return this.http.get<Revision[]>(`http://localhost:3000/repuestos/${idRepuesto}/revisiones`);
  }

  editRepuestoRevision(idRepuesto: string, revision: Revision): Observable<any>{
    return this.http.patch(`http://localhost:3000/repuestos/${idRepuesto}/revisiones`, revision);
  }

  deleteRepuestoRevision(idRepuesto: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/repuestos/${idRepuesto}/revisiones`);
  }
}
