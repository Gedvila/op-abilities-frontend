import { Component, OnInit, signal } from '@angular/core';
import { PoderesClasseService } from '../../services/poderes-classe.service';
import { PoderClasse } from '../../models/poder-classe.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';

@Component({
  selector: 'app-poderes-classe',
  imports: [DataCardComponent],
  templateUrl: './poderes-classe.component.html',
})
export class PoderesClasseComponent implements OnInit {
  items     = signal<PoderClasse[]>([]);
  isLoading = signal(true);
  error     = signal<string | null>(null);

  constructor(private poderesClasseService: PoderesClasseService) {}

  ngOnInit(): void {
    this.poderesClasseService.findAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar poderes de classe. Verifique se a API está a correr.');
        this.isLoading.set(false);
      },
    });
  }

  /**
   * Mapeia os campos do DTO para pares label/valor exibidos no card.
   * Adicione uma linha por campo assim que extender o modelo PoderClasse.
   *
   * Exemplos (descomente após adicionar os campos ao modelo):
   *   { label: 'Arquétipo',    value: item.archetype?.name ?? '—' },
   *   { label: 'Nível',        value: item.level           ?? '—' },
   *   { label: 'Pré-requisito',value: item.prereq          ?? '—' },
   */
  getFields(item: PoderClasse): CardField[] {
    return [
      // TODO: adicione campos conforme o DTO crescer
    ];
  }
}
