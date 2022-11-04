import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from 'src/app/models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  createPersona(persona: Persona): Observable<Object>{
    return this.http.post<Object>(this.URL + "/personas", persona)
  }
}
