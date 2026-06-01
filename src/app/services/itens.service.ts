import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../../models/item.model';

@Injectable({ providedIn: 'root' })
export class ItensService {
  // TODO: ajuste o endpoint conforme sua API
  private readonly API_URL = 'http://localhost:8080/itens';

  constructor(private http: HttpClient) {}

  findAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.API_URL);
  }
}
