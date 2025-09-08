import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AvailableCountry, NagerApiService } from '../../services/nager-api.service';
import { RandomCountriesComponent } from './random-countries.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, RandomCountriesComponent],
  template: `
    <section class="container">
      <h1>Country Info</h1>
      <div class="search">
        <input [ngModel]="query()" (ngModelChange)="onQueryChange($event)" placeholder="Search country by name" />
      </div>
      <div class="content">
        <ul class="countries" *ngIf="filteredCountries().length; else loadingTpl">
          <li *ngFor="let c of filteredCountries()" style="list-style: none;">
            <a [routerLink]="['/country', c.countryCode]">{{ c.name }}</a>
          </li>
        </ul>
        <ng-template #loadingTpl>
          <p *ngIf="loaded(); else loading">Loading countries...</p>
          <ng-template #loading><p>Loading countries...</p></ng-template>
        </ng-template>
      </div>

      <app-random-countries class="random"></app-random-countries>
    </section>
  `,
  styles: [`
    .container { display: grid; gap: 16px; padding: 24px 16px; }
    h1 { margin: 0; }
    .content { display: grid; grid-template-columns: 1fr; gap: 12px; }
    .countries { max-height: 60vh; overflow: auto; border: 1px solid var(--border); padding: 12px 14px; border-radius: 14px; background: var(--card-bg); }
    .countries li { margin: 6px 0; }
    .search { max-width: 100%; }
    .search input { width: 100%;border-radius: 14px;padding: 14px 16px;box-shadow: 0 6px 20px rgba(0,0,0,0.12), 0 2px 6px rgba(0,0,0,0.06);background: linear-gradient(180deg, color-mix(in oklab, var(--card-bg) 85%, transparent), color-mix(in oklab, var(--card-bg) 70%, transparent));backdrop-filter: blur(8px) saturate(120%);color: var(--input-text);-webkit-text-fill-color: var(--input-text);
    }

    .countries::-webkit-scrollbar { width: 10px; }
    .countries::-webkit-scrollbar-track { background: transparent; }
    .countries::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
    .countries:hover::-webkit-scrollbar-thumb { background: color-mix(in oklab, var(--border) 60%, var(--text)); }
    .random { margin-top: 8px; }
  `]
})
export class HomeComponent {
  private readonly api = inject(NagerApiService);
  protected readonly countries = signal<AvailableCountry[]>([]);
  protected readonly loaded = signal(false);
  protected readonly query = signal('');

  protected readonly filteredCountries = computed(() => {
    const q = this.query().trim().toLowerCase();
    if (!q) return this.countries();
    return this.countries().filter(c => c.name.toLowerCase().includes(q));
  });

  constructor() {
    this.api.getAvailableCountries().subscribe({
      next: (list) => {
        this.countries.set(list);
        this.loaded.set(true);
      },
      error: () => this.loaded.set(true)
    });
  }

  protected onQueryChange(value: string) {
    this.query.set(value);
  }
}


