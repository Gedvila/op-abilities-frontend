import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { PoderesParanormaisService } from '../../services/poderes-paranormais.service';
import { PoderParanormal } from '../../models/poder-paranormal.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-poderes-paranormais',
  imports: [DataCardComponent],
  templateUrl: './poderes-paranormais.component.html',
})
export class PoderesParanormaisComponent implements OnInit, OnDestroy {
  items = signal<PoderParanormal[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  private searchSubject = new Subject<string>();

  constructor(private poderesService: PoderesParanormaisService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400), // espera 400ms após o utilizador parar de escrever
        distinctUntilChanged(), // só dispara se o valor mudou de facto
      )
      .subscribe((term) => this.fetchData(term));

    this.fetchData(''); // carregamento inicial
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
    this.poderesService.findAll(name).subscribe({
      next: (page) => {
        this.items.set(page.content);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar poderes paranormais.');
        this.isLoading.set(false);
      },
    });
  }

  getFields(item: PoderParanormal): CardField[] {
    return [
      { label: 'Pré-requisito', value: item.prerequisite ?? '—' },
      { label: 'Afinidade', value: item.affinity ?? '—' },
    ];
  }
}
