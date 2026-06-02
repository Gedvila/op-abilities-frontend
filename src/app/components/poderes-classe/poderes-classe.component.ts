import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PoderesClasseService } from '../../services/poderes-classe.service';
import { PoderClasse } from '../../models/poder-classe.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';
import { ModalOverlayComponent } from '../modal-overlay/modal-overlay.component';

@Component({
  selector: 'app-poderes-classe',
  imports: [DataCardComponent, ModalOverlayComponent, FormsModule],
  templateUrl: './poderes-classe.component.html',
})
export class PoderesClasseComponent implements OnInit, OnDestroy {
  items = signal<PoderClasse[]>([]);
  isLoading = signal(true);
  error = signal<string | null>(null);

  selectedItem = signal<PoderClasse | null>(null);

  showForm = signal(false);
  isSaving = signal(false);
  saveError = signal<string | null>(null);
  newItem: Partial<PoderClasse> = {};

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
    this.searchSubject.next((event.target as HTMLInputElement).value);
  }

  openDetail(item: PoderClasse): void {
    this.selectedItem.set(item);
  }
  closeDetail(): void {
    this.selectedItem.set(null);
  }

  openForm(): void {
    this.newItem = {};
    this.saveError.set(null);
    this.showForm.set(true);
  }
  closeForm(): void {
    this.showForm.set(false);
  }

  onSubmitCreate(): void {
    if (!this.newItem.name?.trim()) return;
    this.isSaving.set(true);
    this.saveError.set(null);
    this.poderesClasseService.insert(this.newItem as Omit<PoderClasse, 'id'>).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeForm();
        this.fetchData('');
      },
      error: () => {
        this.isSaving.set(false);
        this.saveError.set('Erro ao guardar. Verifica os dados e tenta novamente.');
      },
    });
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
