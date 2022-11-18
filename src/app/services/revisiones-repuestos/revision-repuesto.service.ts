import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Repuesto } from 'src/app/models/repuesto';

@Injectable({
  providedIn: 'root'
})
export class RevisionRepuestoService {

  constructor(private http: HttpClient) { }

  createRevisionRepuesto(idRevision: string, repuesto: Repuesto): Observable<Repuesto>{
    return this.http.post<Repuesto>(`http://localhost:3000/revisiones/${idRevision}/repuestos`, repuesto);
  }

  getRevisionRepuestos(idRevision: string): Observable<Repuesto[]>{
    return this.http.get<Repuesto[]>(`http://localhost:3000/revisiones/${idRevision}/repuestos`);
  }

  editRevisionRepuesto(idRevision: string, repuesto: Repuesto): Observable<any>{
    return this.http.patch(`http://localhost:3000/revisiones/${idRevision}/repuestos`, repuesto);
  }

  deleteRevisionRepuesto(idRevision: string): Observable<any>{
    return this.http.delete(`http://localhost:3000/revisiones/${idRevision}/repuestos`);
  }
}
