import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Holiday, NagerApiService, CountryInfo } from '../../services/nager-api.service';

@Component({
  selector: 'app-country',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="container" *ngIf="countryCode(); else notFound">
      <a routerLink="/">← Back</a>
      <h1>{{ info()?.commonName || countryCode() }}</h1>

      <div class="neighbors" *ngIf="info()?.borders?.length">
        <h3>Neighboring countries</h3>
        <div class="chips">
          <a class="chip" *ngFor="let b of info()!.borders" [routerLink]="['/country', b.countryCode]">{{ b.commonName }}</a>
        </div>
      </div>

      <div class="years">
        <button *ngFor="let y of years" [class.active]="y === year()" (click)="setYear(y)">{{ y }}</button>
      </div>

      <ul class="holidays" *ngIf="holidays(); else loading">
        <li *ngFor="let h of holidays()">
          <div class="date"><span class="label">Date:</span> {{ h.date | date: 'mediumDate' }}</div>
          <div class="name"><span class="label">Holiday:</span> {{ h.name }}</div>
          <div class="type"><span class="label">Type:</span> {{ formatTypes(h.types) }}</div>
        </li>
      </ul>
      <ng-template #loading><p>Loading holidays...</p></ng-template>
    </section>
    <ng-template #notFound><p>Country not found</p></ng-template>
  `,
  styles: [`
    .container { display: grid; gap: 12px; padding: 24px 16px; }
    .years { display: flex; flex-wrap: wrap; gap: 8px; }
    .years button { padding: 6px 10px; border-radius: 10px; border: 1px solid var(--border); background: #fff; }
    .years button.active { background: var(--primary); color: #fff; border-color: var(--primary); }
    .holidays { display: grid; gap: 8px; }
    .holidays li { display: grid; grid-template-columns: 220px 1fr 1fr; gap: 8px; align-items: center; border-bottom: 1px solid var(--border); padding: 10px 0; }
    .label { color: var(--muted); font-weight: 600; margin-right: 6px; }
    .chips { display: flex; gap: 6px; flex-wrap: wrap; }
    .chip { border: 1px solid var(--border); padding: 4px 10px; border-radius: 999px; background: var(--card-bg); color: color-mix(in oklab, var(--primary) 85%, var(--text)); }
  `]
})
export class CountryComponent {
  private readonly api = inject(NagerApiService);
  private readonly route = inject(ActivatedRoute);

  protected readonly countryCode = signal<string | null>(null);
  protected readonly year = signal<number>(new Date().getFullYear());
  protected readonly holidays = signal<Holiday[] | null>(null);
  protected readonly info = signal<CountryInfo | null>(null);

  protected readonly years = Array.from({ length: 11 }, (_, i) => 2020 + i);

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const code = params.get('code');
      this.countryCode.set(code);
      if (code) {
        this.loadInfo(code);
        this.loadHolidays(this.year(), code);
      }
    });
  }

  protected setYear(y: number) {
    if (!this.countryCode()) return;
    this.year.set(y);
    this.loadHolidays(y, this.countryCode()!);
  }

  private loadInfo(code: string) {
    this.info.set(null);
    this.api.getCountryInfo(code).subscribe({ next: (data) => this.info.set(data) });
  }

  private loadHolidays(year: number, code: string) {
    this.holidays.set(null);
    this.api.getPublicHolidays(year, code).subscribe({ next: (list) => this.holidays.set(list) });
  }

  protected formatTypes(types?: string[]): string {
    if (!types || types.length === 0) return '—';
    return types
      .map((t) => {
        const key = t.toLowerCase();
        if (key.includes('public')) return 'Public — Official public holiday';
        if (key.includes('bank')) return 'Bank — Bank/financial holiday';
        if (key.includes('school')) return 'School — School holiday';
        if (key.includes('observance')) return 'Observance — Not a day off';
        return t;
      })
      .join(', ');
  }
}


