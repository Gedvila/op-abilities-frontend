import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  protected readonly title = signal('op-abilities-frontend');
  damageList: DamageKind[] = [];

  constructor(private damageKindService: DamageKindService) {}
  ngOnInit(): void {
    this.searchDamageKinds();
  }

  searchDamageKinds(): void {
    this.damageKindService.findAll().subscribe({
      next: (data) => {
        this.damageList = data;
        console.log('Dados carregados com sucesso:', this.damageList);
      },
      error: (erro) => {
        console.error('Falhou a ligação ao back-end:', erro);
      },
    });
  }
}
