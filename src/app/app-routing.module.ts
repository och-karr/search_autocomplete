import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormAutocompleteMultiCarsComponent } from './components/form-autocomplete-multi-cars/form-autocomplete-multi-cars.component';
import { FormAutocompleteCryptoChipsComponent } from './components/form-autocomplete-crypto-chips/form-autocomplete-crypto-chips.component';
import { FormAutocompleteMultiCarsComponentModule } from './components/form-autocomplete-multi-cars/form-autocomplete-multi-cars.component-module';
import { CarServiceModule } from './services/car.service-module';
import { FormAutocompleteCryptoChipsComponentModule } from './components/form-autocomplete-crypto-chips/form-autocomplete-crypto-chips.component-module';
import { CryptoServiceModule } from './services/crypto.service-module';

@NgModule({
  imports: [RouterModule.forRoot([{ path: 'list-2-form-autocomplete-multi-cars', component: FormAutocompleteMultiCarsComponent }, { path: 'list-2-form-autocomplete-simple-crypto-chips', component: FormAutocompleteCryptoChipsComponent }]), FormAutocompleteMultiCarsComponentModule, CarServiceModule, FormAutocompleteCryptoChipsComponentModule, CryptoServiceModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
