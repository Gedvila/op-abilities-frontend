import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { PoderesClasseService } from '../../services/poderes-classe.service';
import { PoderClasse } from '../../models/poder-classe.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-poderes-classe',
  imports: [DataCardComponent],
  templateUrl: './poderes-classe.component.html',
})
export class PoderesClasseComponent implements OnInit, OnDestroy {
  items = signal<PoderClasse[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  private searchSubject = new Subject<string>();

  constructor(private poderesClasseService: PoderesClasseService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((term) => this.fetchData(term));

    this.fetchData('');
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  onSearch(event: Event): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchSubject.next(term);
  }

  private fetchData(name: string): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.poderesClasseService.findAll(name).subscribe({
      next: (page) => {
        this.items.set(page.content);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar poderes de classe.');
        this.isLoading.set(false);
      },
    });
  }

  getFields(item: PoderClasse): CardField[] {
    return [
      { label: 'Arquétipo', value: item.archetype ?? '—' },
      { label: 'Pré-requisito', value: item.prerequisite ?? '—' },
    ];
  }
}
