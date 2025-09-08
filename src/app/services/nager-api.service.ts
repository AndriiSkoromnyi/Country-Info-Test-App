import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface AvailableCountry {
  countryCode: string;
  name: string;
}

export interface Holiday {
  date: string;
  localName: string;
  name: string;
  countryCode: string;
  fixed: boolean;
  global: boolean;
  counties?: string[] | null;
  launchYear?: number | null;
  types?: string[];
}

export interface CountryInfo {
  commonName: string;
  officialName: string;
  countryCode: string;
  region: string;
  borders: { commonName: string; officialName: string; countryCode: string; region: string }[];
}

interface RuntimeEnv {
  NAGER_BASE_URL: string;
}

const defaultEnv: RuntimeEnv = {
  NAGER_BASE_URL: 'https://date.nager.at',
};

declare global {
  interface Window {
    __runtime_env__?: Partial<RuntimeEnv>;
  }
}

@Injectable({ providedIn: 'root' })
export class NagerApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = (window.__runtime_env__?.NAGER_BASE_URL ?? defaultEnv.NAGER_BASE_URL).replace(/\/$/, '');

  getAvailableCountries(): Observable<AvailableCountry[]> {
    return this.http.get<AvailableCountry[]>(`${this.baseUrl}/api/v3/AvailableCountries`).pipe(
      map((list) => list.sort((a, b) => a.name.localeCompare(b.name)))
    );
  }

  getCountryInfo(countryCode: string): Observable<CountryInfo> {
    return this.http.get<CountryInfo>(`${this.baseUrl}/api/v3/CountryInfo/${countryCode}`);
  }

  getPublicHolidays(year: number, countryCode: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.baseUrl}/api/v3/PublicHolidays/${year}/${countryCode}`);
  }

  getNextPublicHolidays(countryCode: string): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(`${this.baseUrl}/api/v3/NextPublicHolidays/${countryCode}`);
  }
}


