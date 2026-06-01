import { Component, OnInit, signal } from '@angular/core';
import { PoderesClasseService } from '../../shared/services/poderes-classe.service';
import { PoderClasse } from '../../models/poder-classe.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';

@Component({
  selector: 'app-poderes-classe',
  imports: [DataCardComponent],
  templateUrl: './poderes-classe.component.html',
})
export class PoderesClasseComponent implements OnInit {
  items    = signal<PoderClasse[]>([]);
  isLoading = signal(true);
  error    = signal<string | null>(null);

  constructor(private poderesClasseService: PoderesClasseService) {}

  ngOnInit(): void {
    this.poderesClasseService.findAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar poderes de classe. Verifique a API.');
        this.isLoading.set(false);
      },
    });
  }

  /** TODO: mapeie os campos do DTO para pares label/valor */
  getFields(item: PoderClasse): CardField[] {
    return [
      // Exemplo: { label: 'Classe', value: item.classe }
    ];
  }
}
