import { Component, OnInit, signal } from '@angular/core';
import { ElementosService } from '../../services/elementos.service';
import { Elemento } from '../../models/elemento.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';

@Component({
  selector: 'app-elementos',
  imports: [DataCardComponent],
  templateUrl: './elementos.component.html',
})
export class ElementosComponent implements OnInit {
  items     = signal<Elemento[]>([]);
  isLoading = signal(true);
  error     = signal<string | null>(null);

  constructor(private elementosService: ElementosService) {}

  ngOnInit(): void {
    this.elementosService.findAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar elementos. Verifique se a API está a correr.');
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Mapeia os campos do DTO para pares label/valor exibidos no card.
   * Adicione uma linha por campo assim que extender o modelo Elemento.
   *
   * Exemplo:
   *   { label: 'Tipo de Dano', value: item.damageKind?.name ?? '—' },
   */
  getFields(item: Elemento): CardField[] {
    return [
      // TODO: adicione campos conforme o DTO crescer
    ];
  }
}
