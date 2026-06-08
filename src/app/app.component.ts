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
    // { id: 'elementos', label: 'Elementos' },
    { id: 'poderes-paranormais', label: 'Poderes Paranormais' },
    { id: 'poderes-classe', label: 'Poderes de Classe' },
    // { id: 'itens', label: 'Itens' },
  ];

  activeTab = signal<TabId | null>(null);

  setTab(id: TabId): void {
    if (this.activeTab() === id) {
      this.activeTab.set(null);
    } else {
      this.activeTab.set(id);
    }
  }

  goHome(): void {
    this.activeTab.set(null);
  }
}
