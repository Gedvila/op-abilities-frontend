import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DamageKind } from '../../models/damage-kind.model';

@Injectable({
  providedIn: 'root',
})
export class DamageKindService {
  private readonly API_URL = 'http://localhost:8080/dmgkind';
  constructor(private http: HttpClient) {}

  findAll(): Observable<DamageKind[]> {
    return this.http.get<DamageKind[]>(this.API_URL);
  }
}
