import {Component} from '@angular/core';
import {Country} from '../../interfaces/country';
import {CountriesService} from '../../services/countries.service';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: []
})
export class ByCapitalPageComponent {

  public countries: Country[] = [];

  constructor(private countriesService: CountriesService) {}

  public searchByCapital(term: string): void {
    this.countriesService.searchCapital(term)
        .subscribe(countries => {
          this.countries = countries;
        });
  }
}
