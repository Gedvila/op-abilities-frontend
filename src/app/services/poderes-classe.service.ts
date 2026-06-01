import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoderClasse } from '../models/poder-classe.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class PoderesClasseService {
  // TODO: verifique o path exato no seu AbilityController (@RequestMapping)
  private readonly API_URL = `${environment.apiUrl}/ability`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<PoderClasse[]> {
    return this.http.get<PoderClasse[]>(this.API_URL);
  }

  findById(id: number): Observable<PoderClasse> {
    return this.http.get<PoderClasse>(`${this.API_URL}/${id}`);
  }
}
