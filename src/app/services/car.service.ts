import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarModel } from '../models/car.model';
import {CarBrandModel} from "../models/car-brand.model";
import {ComfortFeatureModel} from "../models/comfort-feature.model";
import {SecurityFeatureModel} from "../models/security-feature.model";

@Injectable()
export class CarService {
  constructor(private _httpClient: HttpClient) {
  }

  getAllCars(): Observable<CarModel[]> {
    return this._httpClient.get<CarModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/cars');
  }

  getAllCarBrands(): Observable<CarBrandModel[]> {
    return this._httpClient.get<CarBrandModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/car-brands');
  }

  getAllComfortFeatures(): Observable<ComfortFeatureModel[]> {
    return this._httpClient.get<ComfortFeatureModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/car-comfort-features');
  }

  getAllSecurityFeatures(): Observable<SecurityFeatureModel[]> {
    return this._httpClient.get<SecurityFeatureModel[]>('https://636ce2d8ab4814f2b2712854.mockapi.io/car-security-features');
  }
}
