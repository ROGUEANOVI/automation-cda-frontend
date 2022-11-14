import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private URL = "http://localhost:3000/personas/";

  constructor(private http: HttpClient) { }

  createPersona(persona: Persona): Observable<Object>{
    return this.http.post<Object>(this.URL , persona)
  }

  listPersonas(): Observable<Persona[]>{
    return this.http.get<Persona[]>(this.URL)
  }

  getPersona(id: string): Observable<Persona>{
    return this.http.get<Persona>(this.URL + id);
  }

  editPersona(id: string, persona: Persona): Observable<Persona>{
    return this.http.put<Persona>(this.URL + id, persona);
  }

  deletePersona(id: string): Observable<any>{
    return this.http.delete(this.URL + id);
  }

}
