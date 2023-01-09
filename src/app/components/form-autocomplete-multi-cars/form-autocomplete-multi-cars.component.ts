import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Observable, combineLatest, shareReplay, startWith, tap } from 'rxjs';
import { CarBrandModel } from '../../models/car-brand.model';
import { SecurityFeatureModel } from '../../models/security-feature.model';
import { ComfortFeatureModel } from '../../models/comfort-feature.model';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-form-autocomplete-multi-cars',
  styleUrls: ['./form-autocomplete-multi-cars.component.scss'],
  templateUrl: './form-autocomplete-multi-cars.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAutocompleteMultiCarsComponent {
  readonly searchForm: FormGroup = new FormGroup({
    brand: new FormControl(),
    securityFeature: new FormControl(),
    comfortFeature: new FormControl()
  });

  readonly searchFormValues$ = this.searchForm.valueChanges.pipe(
    tap(console.log),
    startWith({
      brand: '',
      securityFeature: '',
      comfortFeature: ''
    }),
    shareReplay(1)
  )
  readonly brands$: Observable<CarBrandModel[]> = this._carService.getAllCarBrands();
  readonly securityFeatures$: Observable<SecurityFeatureModel[]> = this._carService.getAllSecurityFeatures();
  readonly comfortFeatures$: Observable<ComfortFeatureModel[]> = this._carService.getAllComfortFeatures();

  readonly filteredBrands$: Observable<CarBrandModel[]> = combineLatest([
    this.searchFormValues$,
    this._carService.getAllCarBrands()
  ]).pipe(
    map(([searchForm, carBrands]) =>
      carBrands.filter((brand) =>
        brand.name.toLowerCase().includes(searchForm.brand ? searchForm.brand.toLowerCase() : '')
      )
    )
  )

  readonly filteredSecurityFeatures$: Observable<SecurityFeatureModel[]> = combineLatest([
    this.searchFormValues$,
    this._carService.getAllSecurityFeatures()
  ]).pipe(
    map(([searchForm, securityFeatures]) =>
      securityFeatures.filter((feature) =>
        feature.name.toLowerCase().includes(searchForm.securityFeature ? searchForm.securityFeature.toLowerCase() : '')
      )
    )
  )

  readonly filteredComfortFeatures$: Observable<ComfortFeatureModel[]> = combineLatest([
    this.searchFormValues$,
    this._carService.getAllComfortFeatures()
  ]).pipe(
    map(([searchForm, comfortFeatures]) =>
      comfortFeatures.filter((feature) =>
        feature.name.toLowerCase().includes(searchForm.comfortFeature ? searchForm.comfortFeature.toLowerCase() : '')
      )
    )
  )

  readonly cars$: Observable<
    {
      brand: string;
      model: string;
      comfortFeatures: string[];
      securityFeatures: string[];
    }[]
  > = combineLatest([
    this._carService.getAllCars(),
    this.brands$,
    this.securityFeatures$,
    this.comfortFeatures$,
    this.searchFormValues$
  ]).pipe(
    map(([cars, brands, securityFeatures, comfortFeatures, searchForm]) => {
      const brandMap = brands.reduce((a, c) => {
        return { ...a, [c.id]: c };
      }, {}) as Record<string, CarBrandModel>;
      const securityMap = securityFeatures.reduce((a, c) => {
        return { ...a, [c.id]: c };
      }, {}) as Record<string, SecurityFeatureModel>;
      const comfortMap = comfortFeatures.reduce((a, c) => {
        return { ...a, [c.id]: c };
      }, {}) as Record<string, ComfortFeatureModel>;

      return cars
        .filter(car =>
          (!searchForm.brand || searchForm.brand?.trim().length === 0 || brandMap[car.brandId]?.name === searchForm.brand) &&
          (!searchForm.securityFeature || searchForm.securityFeature?.trim().length === 0 ||
            car.securityFeatureIds
              .map(feature => securityMap[feature]?.name)
              .includes(searchForm.securityFeature)
          ) &&
          (!searchForm.comfortFeature || searchForm.comfortFeature?.trim().length === 0 ||
            car.comfortFeatureIds
              .map(feature => comfortMap[feature]?.name)
              .includes(searchForm.comfortFeature)
          )
        )
        .map(car => {
          return {
            brand: brandMap[car.brandId]?.name,
            model: car.model,
            comfortFeatures: (car.comfortFeatureIds ?? []).map(
              feature => comfortMap[feature]?.name
            ),
            securityFeatures: (car.securityFeatureIds ?? []).map(
              feature => securityMap[feature]?.name
            )
          }
        });
    })
  )

  constructor(private _carService: CarService) {
  }
}
