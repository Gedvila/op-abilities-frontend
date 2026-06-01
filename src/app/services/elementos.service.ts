import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Elemento } from '../../models/elemento.model';

@Injectable({ providedIn: 'root' })
export class ElementosService {
  // TODO: ajuste o endpoint conforme sua API
  private readonly API_URL = 'http://localhost:8080/elementos';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Elemento[]> {
    return this.http.get<Elemento[]>(this.API_URL);
  }
}
