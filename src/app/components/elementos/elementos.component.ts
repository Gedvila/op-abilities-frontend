import { Component, OnInit, signal } from '@angular/core';
import { ElementosService } from '../../shared/services/elementos.service';
import { Elemento } from '../../models/elemento.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';

@Component({
  selector: 'app-elementos',
  imports: [DataCardComponent],
  templateUrl: './elementos.component.html',
})
export class ElementosComponent implements OnInit {
  items    = signal<Elemento[]>([]);
  isLoading = signal(true);
  error    = signal<string | null>(null);

  constructor(private elementosService: ElementosService) {}

  ngOnInit(): void {
    this.elementosService.findAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar elementos. Verifique a API.');
        this.isLoading.set(false);
      },
    });
  }

  /** TODO: mapeie os campos do DTO para pares label/valor */
  getFields(item: Elemento): CardField[] {
    return [
      // Exemplo: { label: 'Tipo', value: item.tipo }
    ];
  }
}
