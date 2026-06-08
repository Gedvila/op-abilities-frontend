import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoderParanormal } from '../../models/poder-paranormal.model';
import { environment } from '../../environments/environment';
import { Page } from '../../models/page.model';

@Injectable({ providedIn: 'root' })
export class PoderesParanormaisService {
  private readonly API_URL = `${environment.apiUrl}/parpw`; // endpoint correto

  constructor(private http: HttpClient) {}

  findAll(name = ''): Observable<Page<PoderParanormal>> {
    const params: Record<string, string> = {};
    if (name.trim()) params['name'] = name.trim();
    return this.http.get<Page<PoderParanormal>>(this.API_URL, { params });
  }

  insert(dto: Omit<PoderParanormal, 'id'>): Observable<PoderParanormal> {
    return this.http.post<PoderParanormal>(this.API_URL, dto);
  }

  update(id: number, dto: Omit<PoderParanormal, 'id'>): Observable<PoderParanormal> {
    return this.http.put<PoderParanormal>(this.API_URL, { id, ...dto }, { params: { id } });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(this.API_URL, { params: { id } });
  }
}
