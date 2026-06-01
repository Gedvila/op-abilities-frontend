import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Item } from '../models/item.model';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItensService {
  // TODO: implemente quando o endpoint de itens estiver disponível no backend
  private readonly API_URL = `${environment.apiUrl}/item`;

  constructor(private http: HttpClient) {}

  findAll(): Observable<Item[]> {
    // TODO: substitua o `of([])` pelo http.get quando o endpoint estiver pronto
    return of([]);
    // return this.http.get<Item[]>(this.API_URL);
  }

  findById(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.API_URL}/${id}`);
  }
}
