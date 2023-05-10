import {Component} from '@angular/core';
import {Country} from '../../interfaces/country';
import {CountriesService} from '../../services/countries.service';

enum Region {
  Africa = 'Africa',
  Americas = 'Americas',
  Asia = 'Asia',
  Europe = 'Europe',
  Oceania = 'Oceania'
}

@Component({
  selector: 'countries-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: []
})
export class ByRegionPageComponent {

  public countries: Country[] = [];

  public isLoading: boolean = false;

  public regions: Region[] = [
    Region.Africa,
    Region.Americas,
    Region.Asia,
    Region.Europe,
    Region.Oceania
  ];

  public selectedRegion?: Region;

  constructor(private countriesService: CountriesService) {}

  searchByRegion(region: Region): void {
    this.selectedRegion = region;
    this.isLoading = true;
    this.countriesService.searchRegion(region)
      .subscribe(countries => {
        this.countries = countries;
        this.isLoading = false;
      });
  }
}
