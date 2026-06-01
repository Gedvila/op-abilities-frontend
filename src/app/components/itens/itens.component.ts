import { Component, OnInit, signal } from '@angular/core';
import { ItensService } from '../../services/itens.service';
import { Item } from '../../models/item.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';

@Component({
  selector: 'app-itens',
  imports: [DataCardComponent],
  templateUrl: './itens.component.html',
})
export class ItensComponent implements OnInit {
  items    = signal<Item[]>([]);
  isLoading = signal(true);
  error    = signal<string | null>(null);

  constructor(private itensService: ItensService) {}

  ngOnInit(): void {
    this.itensService.findAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar itens. Verifique a API.');
        this.isLoading.set(false);
      },
    });
  }

  /** TODO: mapeie os campos do DTO para pares label/valor */
  getFields(item: Item): CardField[] {
    return [
      // Exemplo: { label: 'Raridade', value: item.raridade }
    ];
  }
}
