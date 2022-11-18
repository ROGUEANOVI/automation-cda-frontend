import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Revision } from 'src/app/models/revision';


@Injectable({
  providedIn: 'root'
})
export class RevisionService {

  private URL = "http://localhost:3000/revisiones/";

  constructor(private http: HttpClient) { }

  createRevision(revision: Revision): Observable<Object>{
    return this.http.post<Object>(this.URL , revision)
  }

  getListRevisiones(): Observable<Revision[]>{
    return this.http.get<Revision[]>(this.URL)
  }

  getRevision(id: string): Observable<Revision>{
    return this.http.get<Revision>(this.URL + id);
  }

  editRevision(id: string, revision: Revision): Observable<Revision>{
    return this.http.put<Revision>(this.URL + id, revision);
  }

  deleteRevision(id: string): Observable<any>{
    return this.http.delete(this.URL + id);
  }
}
