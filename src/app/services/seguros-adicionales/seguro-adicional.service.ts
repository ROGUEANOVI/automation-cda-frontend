import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguroAdicional } from 'src/app/models/seguroadicional';

@Injectable({
  providedIn: 'root'
})
export class SeguroAdicionalService {


  private URL = "http://localhost:3000/seguros-adicionales/";

  constructor(private http: HttpClient) { }

  createSeguroAdicional(seguroAdicional: SeguroAdicional): Observable<Object>{
    return this.http.post<Object>(this.URL , seguroAdicional)
  }

  getListSegurosAdicionales(): Observable<SeguroAdicional[]>{
    return this.http.get<SeguroAdicional[]>(this.URL)
  }

  getSeguroAdicional(id: string): Observable<SeguroAdicional>{
    return this.http.get<SeguroAdicional>(this.URL + id);
  }

  editSeguroAdicional(id: string, seguroAdicional: SeguroAdicional): Observable<SeguroAdicional>{
    return this.http.put<SeguroAdicional>(this.URL + id, seguroAdicional);
  }

  deleteSeguroAdicional(id: string): Observable<any>{
    return this.http.delete(this.URL + id);
  }
}
