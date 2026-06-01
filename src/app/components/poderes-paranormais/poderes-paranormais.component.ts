import { Component, OnInit, signal } from '@angular/core';
import { PoderesParanormaisService } from '../../shared/services/poderes-paranormais.service';
import { PoderParanormal } from '../../models/poder-paranormal.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';

@Component({
  selector: 'app-poderes-paranormais',
  imports: [DataCardComponent],
  templateUrl: './poderes-paranormais.component.html',
})
export class PoderesParanormaisComponent implements OnInit {
  items    = signal<PoderParanormal[]>([]);
  isLoading = signal(true);
  error    = signal<string | null>(null);

  constructor(private poderesService: PoderesParanormaisService) {}

  ngOnInit(): void {
    this.poderesService.findAll().subscribe({
      next: (data) => {
        this.items.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar poderes paranormais. Verifique a API.');
        this.isLoading.set(false);
      },
    });
  }

  /** TODO: mapeie os campos do DTO para pares label/valor */
  getFields(item: PoderParanormal): CardField[] {
    return [
      // Exemplo: { label: 'Custo PE', value: item.custoPE }
    ];
  }
}
