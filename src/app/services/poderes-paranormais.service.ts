import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoderParanormal } from '../models/poder-paranormal.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class PoderesParanormaisService {
  // TODO: verifique o path exato no seu ParanormalPowerController (@RequestMapping)
  private readonly API_URL = `${environment.apiUrl}/paranormalpower`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<PoderParanormal[]> {
    return this.http.get<PoderParanormal[]>(this.API_URL);
  }

  findById(id: number): Observable<PoderParanormal> {
    return this.http.get<PoderParanormal>(`${this.API_URL}/${id}`);
  }
}
