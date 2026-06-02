import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-overlay',
  imports: [],
  templateUrl: './modal-overlay.component.html',
  styleUrl: './modal-overlay.component.css',
})
export class ModalOverlayComponent {
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }
}
