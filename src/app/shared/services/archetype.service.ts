import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Archetype } from '../../models/archetype.model';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ArchetypeService {
  private readonly API_URL = `${environment.apiUrl}/arch`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Archetype[]> {
    return this.http.get<Archetype[]>(this.API_URL);
  }
}
