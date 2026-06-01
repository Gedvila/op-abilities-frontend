import { Component, Input } from '@angular/core';

export interface CardField {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-data-card',
  imports: [],
  templateUrl: './data-card.component.html',
  styleUrl: './data-card.component.css',
})
export class DataCardComponent {
  /** Título principal do card (obrigatório) */
  @Input({ required: true }) title!: string;

  /** Texto de descrição abaixo do título */
  @Input() description?: string;

  /** Lista de pares label/valor exibidos na parte inferior */
  @Input() fields: CardField[] = [];

  /** Rótulo colorido no canto superior do card */
  @Input() badge?: string;
}
