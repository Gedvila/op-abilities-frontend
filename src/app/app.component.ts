import { Component, signal } from '@angular/core';
import { ElementosComponent } from './components/elementos/elementos.component';
import { PoderesParanormaisComponent } from './components/poderes-paranormais/poderes-paranormais.component';
import { PoderesClasseComponent } from './components/poderes-classe/poderes-classe.component';
import { ItensComponent } from './components/itens/itens.component';

export type TabId =
  | 'elementos'
  | 'poderes-paranormais'
  | 'poderes-classe'
  | 'itens';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-root',
  imports: [
    ElementosComponent,
    PoderesParanormaisComponent,
    PoderesClasseComponent,
    ItensComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class AppComponent {
  readonly tabs: Tab[] = [
    { id: 'elementos',           label: 'Elementos',           icon: '🌊' },
    { id: 'poderes-paranormais', label: 'Poderes Paranormais', icon: '✨' },
    { id: 'poderes-classe',      label: 'Poderes de Classe',   icon: '⚔️' },
    { id: 'itens',               label: 'Itens',               icon: '🎒' },
  ];

  activeTab = signal<TabId>('elementos');

  setTab(id: TabId): void {
    this.activeTab.set(id);
  }
}
