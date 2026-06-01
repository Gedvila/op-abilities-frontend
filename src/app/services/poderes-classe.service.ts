import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoderClasse } from '../../models/poder-classe.model';

@Injectable({ providedIn: 'root' })
export class PoderesClasseService {
  // TODO: ajuste o endpoint conforme sua API
  private readonly API_URL = 'http://localhost:8080/poderes-classe';

  constructor(private http: HttpClient) {}

  findAll(): Observable<PoderClasse[]> {
    return this.http.get<PoderClasse[]>(this.API_URL);
  }
}
