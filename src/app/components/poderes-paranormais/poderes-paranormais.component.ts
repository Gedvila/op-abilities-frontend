import { Component, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PoderesParanormaisService } from '../../shared/services/poderes-paranormais.service';
import { PoderParanormal } from '../../models/poder-paranormal.model';
import { DataCardComponent, CardField } from '../data-card/data-card.component';
import { ModalOverlayComponent } from '../modal-overlay/modal-overlay.component';
import { Elemento } from '../../models/elemento.model';
import { ElementosService } from '../../shared/services/elementos.service';

@Component({
  selector: 'app-poderes-paranormais',
  imports: [DataCardComponent, ModalOverlayComponent, FormsModule],
  templateUrl: './poderes-paranormais.component.html',
})
export class PoderesParanormaisComponent implements OnInit, OnDestroy {
  items = signal<PoderParanormal[]>([]);
  elementos = signal<Elemento[]>([]);
  currentPage = signal(0);
  totalPages = signal(0);
  totalElements = signal(0);
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

  isLoading = signal(true);
  error = signal<string | null>(null);

  // ── Modais ──────────────────────────────────────────────────────────────
  selectedItem = signal<PoderParanormal | null>(null);
  showForm = signal(false);
  showEditForm = signal(false);
  showDeleteConfirm = signal(false);

  // ── Estado dos formulários ───────────────────────────────────────────────
  newItem: Partial<PoderParanormal> = {};
  editItem: Partial<PoderParanormal> = {};

  isSaving = signal(false);
  isDeleting = signal(false);
  saveError = signal<string | null>(null);

  private searchSubject = new Subject<string>();
  private currentSearch = '';

  constructor(
    private poderesService: PoderesParanormaisService,
    private elementosService: ElementosService,
  ) {}

  ngOnInit(): void {
    this.searchSubject.pipe(debounceTime(400), distinctUntilChanged()).subscribe((term) => {
      this.currentSearch = term;
      this.fetchData(term, 0);
    });
    this.fetchData('');
    this.elementosService.findAll().subscribe({
      next: (data) => this.elementos.set(data),
    });
  }

  ngOnDestroy(): void {
    this.searchSubject.complete();
  }

  onSearch(event: Event): void {
    this.searchSubject.next((event.target as HTMLInputElement).value);
  }

  // ── Detalhe ──────────────────────────────────────────────────────────────
  openDetail(item: PoderParanormal): void {
    this.selectedItem.set(item);
  }
  closeDetail(): void {
    this.selectedItem.set(null);
  }

  // ── Criar ────────────────────────────────────────────────────────────────
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
    this.poderesService.insert(this.newItem as Omit<PoderParanormal, 'id'>).subscribe({
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

  // ── Editar ───────────────────────────────────────────────────────────────
  openEdit(): void {
    const item = this.selectedItem();
    if (!item) return;
    this.editItem = { ...item }; // cópia para não mutar o original
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
    const { id: _, ...dto } = this.editItem as PoderParanormal;
    this.poderesService.update(id, dto).subscribe({
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

  // ── Deletar ──────────────────────────────────────────────────────────────
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
    this.poderesService.delete(id).subscribe({
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

  // ── Dados ────────────────────────────────────────────────────────────────
  private fetchData(name: string, page = 0): void {
    this.isLoading.set(true);
    this.error.set(null);
    this.poderesService.findAll(name, page, this.pageSize()).subscribe({
      next: (data) => {
        this.items.set(data.content);
        this.totalPages.set(data.totalPages);
        this.totalElements.set(data.totalElements);
        this.currentPage.set(data.number);
        this.isLoading.set(false);
      },
      error: () => {
        this.error.set('Erro ao carregar poderes paranormais.');
        this.isLoading.set(false);
      },
    });
  }

  goToPage(page: number): void {
    this.fetchData(this.currentSearch, page);
  }

  nextPage(): void {
    if (this.currentPage() < this.totalPages() - 1) {
      this.goToPage(this.currentPage() + 1);
    }
  }

  prevPage(): void {
    if (this.currentPage() > 0) {
      this.goToPage(this.currentPage() - 1);
    }
  }

  getBadgeClass(element: string): string {
    const map: Record<string, string> = {
      Sangue: 'badge-sangue',
      Morte: 'badge-morte',
      Energia: 'badge-energia',
    };
    return map[element] ?? '';
  }

  getFields(item: PoderParanormal): CardField[] {
    return [
      { label: 'Pré-requisito', value: item.prerequisite ?? '—' },
      { label: 'Afinidade', value: item.affinity ?? '—' },
    ];
  }

  onPageSizeChange(event: Event): void {
    const size = Number((event.target as HTMLSelectElement).value);
    this.pageSize.set(size);
    this.fetchData(this.currentSearch, 0); // volta à página 0 ao mudar o tamanho
  }
}
