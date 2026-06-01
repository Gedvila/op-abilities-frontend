import { Component, OnInit, signal } from '@angular/core';
import { PoderesParanormaisService } from '../../services/poderes-paranormais.service';
import { PoderParanormal } from '../../models/poder-paranormal.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';

@Component({
  selector: 'app-poderes-paranormais',
  imports: [DataCardComponent],
  templateUrl: './poderes-paranormais.component.html',
})
export class PoderesParanormaisComponent implements OnInit {
  items     = signal<PoderParanormal[]>([]);
  isLoading = signal(true);
  error     = signal<string | null>(null);

  constructor(private poderesService: PoderesParanormaisService) {}

  ngOnInit(): void {
    this.poderesService.findAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar poderes paranormais. Verifique se a API está a correr.');
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Mapeia os campos do DTO para pares label/valor exibidos no card.
   * Adicione uma linha por campo assim que extender o modelo PoderParanormal.
   *
   * Exemplos (descomente após adicionar os campos ao modelo):
   *   { label: 'Elemento',   value: item.element?.name    ?? '—' },
   *   { label: 'Execução',   value: item.executionType    ?? '—' },
   *   { label: 'Custo (PE)', value: item.cost             ?? '—' },
   *   { label: 'Alcance',    value: item.range            ?? '—' },
   */
  getFields(item: PoderParanormal): CardField[] {
    return [
      // TODO: adicione campos conforme o DTO crescer
    ];
  }
}
