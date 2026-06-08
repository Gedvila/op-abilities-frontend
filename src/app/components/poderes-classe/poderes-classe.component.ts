import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PoderesClasseService } from '../../shared/services/poderes-classe.service';
import { PoderClasse } from '../../models/poder-classe.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';
import { ModalOverlayComponent } from '../modal-overlay/modal-overlay.component';
import { Archetype } from '../../models/archetype.model';
import { ArchetypeService } from '../../shared/services/archetype.service';

@Component({
  selector: 'app-poderes-classe',
  imports: [DataCardComponent, ModalOverlayComponent, FormsModule],
  templateUrl: './poderes-classe.component.html',
})
export class PoderesClasseComponent implements OnInit, OnDestroy {
  items = signal<PoderClasse[]>([]);
  archetypes = signal<Archetype[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  totalElements = signal(0);
  isLoading = signal(true);
  error = signal<string | null>(null);
  readonly pageSizes = [20, 40, 60, 80, 100];
  pageSize = signal(20);
  visiblePages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const pages: number[] = [];
    for (let i = Math.max(0, current - 2); i <= Math.min(total - 1, current + 2); i++) {
      pages.push(i);
    }
    return pages;
  });

  selectedItem = signal<PoderClasse | null>(null);
  showForm = signal(false);
  showEditForm = signal(false);
  showDeleteConfirm = signal(false);

  newItem: Partial<PoderClasse> = {};
  editItem: Partial<PoderClasse> = {};

  isSaving = signal(false);
  isDeleting = signal(false);
  saveError = signal<string | null>(null);

  private searchSubject = new Subject<string>();
  private currentSearch = '';

  constructor(
    private poderesClasseService: PoderesClasseService,
    private archetypeService: ArchetypeService,
  ) {}

  ngOnInit(): void {
    this.archetypeService.findAll().subscribe({
      next: (data) => this.archetypes.set(data),
    });

    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((term) => {
      this.currentSearch = term;
      this.fetchData(term, 0);
    });

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
        this.saveError.set('Erro ao guardar.');
      },
    });
  }

  openEdit(): void {
    const item = this.selectedItem();
    if (!item) return;
    this.editItem = { ...item };
    this.saveError.set(null);
    this.closeDetail();
    this.showEditForm.set(true);
  }
  closeEdit(): void {
    this.showEditForm.set(false);
  }

  onSubmitEdit(): void {
    const id = this.editItem.id;
    if (!id || !this.editItem.name?.trim()) return;
    this.isSaving.set(true);
    this.saveError.set(null);
    const { id: _, ...dto } = this.editItem as PoderClasse;
    this.poderesClasseService.update(id, dto).subscribe({
      next: () => {
        this.isSaving.set(false);
        this.closeEdit();
        this.fetchData('');
      },
      error: () => {
        this.isSaving.set(false);
        this.saveError.set('Erro ao guardar.');
      },
    });
  }

  openDeleteConfirm(): void {
    this.showDeleteConfirm.set(true);
  }
  closeDeleteConfirm(): void {
    this.showDeleteConfirm.set(false);
  }

  onConfirmDelete(): void {
    const id = this.selectedItem()?.id;
    if (!id) return;
    this.isDeleting.set(true);
    this.poderesClasseService.delete(id).subscribe({
      next: () => {
        this.isDeleting.set(false);
        this.closeDeleteConfirm();
        this.closeDetail();
        this.fetchData('');
      },
      error: () => {
        this.isDeleting.set(false);
      },
    });
  }

  private fetchData(name: string, page = 0): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.poderesClasseService.findAll(name, page, this.pageSize()).subscribe({
      next: (data) => {
        this.items.set(data.content);
        this.totalPages.set(data.totalPages);
        this.totalElements.set(data.totalElements);
        this.currentPage.set(data.number);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar poderes de classe.');
        this.isLoading.set(false);
      },
    });
  }

  goToPage(page: number): void {
    this.fetchData(this.currentSearch, page);
  }
  nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) this.goToPage(this.currentPage() + 1);
  }
  prevPage(): void {
    if (this.currentPage() > 0) this.goToPage(this.currentPage() - 1);
  }

  getFields(item: PoderClasse): CardField[] {
    return [
      { label: 'Arquétipo', value: item.archetype ?? '—' },
      { label: 'Pré-requisito', value: item.prerequisite ?? '—' },
    ];
  }

  onPageSizeChange(event: Event): void {
    const size = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(size);
    this.fetchData(this.currentSearch, 0); // volta à página 0 ao mudar o tamanho
  }
}
