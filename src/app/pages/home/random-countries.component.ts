import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AvailableCountry, Holiday, NagerApiService } from '../../services/nager-api.service';

interface RandomCountryHoliday {
  country: AvailableCountry;
  nextHoliday?: Holiday | null;
}

@Component({
  selector: 'app-random-countries',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section>
      <h2>Random Countries – Next Holiday</h2>
      <div class="cards">
        <div class="card" *ngFor="let item of items()">
          <a [routerLink]="['/country', item.country.countryCode]" class="name">{{ item.country.name }}</a>
          <div class="holiday" *ngIf="item.nextHoliday; else none">
            <div class="holiday-name">{{ item.nextHoliday!.name }}</div>
            <div class="holiday-date">{{ item.nextHoliday!.date | date: 'mediumDate' }}</div>
          </div>
          <ng-template #none><div class="holiday none">No upcoming holiday</div></ng-template>
        </div>
      </div>
    </section>
  `,
  styles: [`
    h2 { margin: 8px 0; }
    .cards { display: grid; grid-template-columns: repeat(auto-fit,minmax(240px,1fr)); gap: 12px; }
    .card { border: 1px solid var(--border); border-radius: 12px; padding: 12px; display: grid; gap: 6px; background: var(--card-bg); }
    .name { font-weight: 600; color: color-mix(in oklab, var(--primary) 85%, var(--text)); }
    .holiday { color: var(--text); }
    .holiday.none { color: var(--muted); font-style: italic; }
  `]
})
export class RandomCountriesComponent {
  private readonly api = inject(NagerApiService);
  protected readonly items = signal<RandomCountryHoliday[]>([]);

  constructor() {
    this.api.getAvailableCountries().subscribe((countries) => {
      const shuffled = [...countries].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, 3);
      this.items.set(selected.map((c) => ({ country: c, nextHoliday: null })));
      selected.forEach((c, idx) => {
        this.api.getNextPublicHolidays(c.countryCode).subscribe({
          next: (holidays) => {
            const nextHoliday = holidays && holidays.length ? holidays[0] : null;
            const updated = [...this.items()];
            updated[idx] = { country: c, nextHoliday };
            this.items.set(updated);
          },
          error: () => {
            const updated = [...this.items()];
            updated[idx] = { country: c, nextHoliday: null };
            this.items.set(updated);
          }
        });
      });
    });
  }
}


