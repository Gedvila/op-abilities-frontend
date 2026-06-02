import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoderClasse } from '../models/poder-classe.model';
import { environment } from '../environments/environment';
import { Page } from '../models/page.model';

@Injectable({ providedIn: 'root' })
export class PoderesClasseService {
  private readonly API_URL = `${environment.apiUrl}/ability`;

  constructor(private http: HttpClient) {}

  findAll(name = ''): Observable<Page<PoderClasse>> {
    const params: Record<string, string> = {};
    if (name.trim()) params['name'] = name.trim();
    return this.http.get<Page<PoderClasse>>(this.API_URL, { params });
  }

  insert(dto: Omit<PoderClasse, 'id'>): Observable<PoderClasse> {
    return this.http.post<PoderClasse>(this.API_URL, dto);
  }
}
