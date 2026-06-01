import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PoderParanormal } from '../../models/poder-paranormal.model';

@Injectable({ providedIn: 'root' })
export class PoderesParanormaisService {
  // TODO: ajuste o endpoint conforme sua API
  private readonly API_URL = 'http://localhost:8080/poderes-paranormais';

  constructor(private http: HttpClient) {}

  findAll(): Observable<PoderParanormal[]> {
    return this.http.get<PoderParanormal[]>(this.API_URL);
  }
}
