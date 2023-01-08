import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormAutocompleteMultiCarsComponent } from './components/form-autocomplete-multi-cars/form-autocomplete-multi-cars.component';
import { FormAutocompleteMultiCarsComponentModule } from './components/form-autocomplete-multi-cars/form-autocomplete-multi-cars.component-module';
import { CarServiceModule } from './services/car.service-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'list-2-form-autocomplete-multi-cars', component: FormAutocompleteMultiCarsComponent }]), FormAutocompleteMultiCarsComponentModule, CarServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
