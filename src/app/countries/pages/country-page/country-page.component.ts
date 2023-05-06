import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {count, switchMap} from 'rxjs';
import {Country, Translation} from '../../interfaces/country';
import {CountriesService} from '../../services/countries.service';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: []
})
export class CountryPageComponent implements OnInit {

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private countriesService: CountriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
        .pipe(
          switchMap(({id}) => this.countriesService.searchCountryByAlphaCode(id)),
        )
        .subscribe(country => {
          if (!country) return this.router.navigateByUrl('');
          return this.country = country;
        });
  }

  get allTranslations(): Translation[] {
    return Object.values(this.country!.translations);
  }
}
