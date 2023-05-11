import {HttpClient} from '@angular/common/http';
import {Injectable, OnDestroy, OnInit} from '@angular/core';
import {catchError, map, Observable, of, tap} from 'rxjs';
import {CacheStore} from '../interfaces/cache-store.interface';
import {Country} from '../interfaces/country';
import {Region} from '../interfaces/region.enum';

@Injectable({providedIn: 'root'})
export class CountriesService {

  public cacheStore: CacheStore = {
    byCapital: {term: '', countries: []},
    byCountry: {term: '', countries: []},
    byRegion: {region: Region.None, countries: []},
  };

  private apiUrl: string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  private saveLocalStorage(): void {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadLocalStorage(): void {
    let data = localStorage.getItem('cacheStore');
    if (!data) return;
    this.cacheStore = JSON.parse(data);
  }

  searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.http
      .get<Country[]>(url)
      .pipe(
        map(countries => countries.length > 0 ? countries[0] : null),
        catchError(() => of(null))
      );
  }

  searchCapital(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCapital = {term, countries}),
        tap(() => this.saveLocalStorage())
      );
  }

  searchCountry(term: string): Observable<Country[]> {
    const url = `${this.apiUrl}/name/${term}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byCountry = {term, countries}),
        tap(() => this.saveLocalStorage())
      );
  }

  searchRegion(region: Region): Observable<Country[]> {
    const url = `${this.apiUrl}/region/${region}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap(countries => this.cacheStore.byRegion = {region, countries}),
        tap(() => this.saveLocalStorage())
      );
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http
      .get<Country[]>(url)
      .pipe(
        catchError(() => of([])),
      );
  }
}
