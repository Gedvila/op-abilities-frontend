import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Elemento } from '../models/elemento.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ElementosService {
  // TODO: verifique o path exato no seu ElementController (@RequestMapping)
  private readonly API_URL = `${environment.apiUrl}/element`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Elemento[]> {
    return this.http.get<Elemento[]>(this.API_URL);
  }

  findById(id: number): Observable<Elemento> {
    return this.http.get<Elemento>(`${this.API_URL}/${id}`);
  }
}
