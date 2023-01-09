import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { FormAutocompleteCryptoChipsComponent } from './form-autocomplete-crypto-chips.component';
import {MatChipsModule} from "@angular/material/chips";

@NgModule({
  imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatAutocompleteModule, MatOptionModule, CommonModule, MatCardModule, MatChipsModule],
  declarations: [FormAutocompleteCryptoChipsComponent],
  providers: [],
  exports: [FormAutocompleteCryptoChipsComponent]
})
export class FormAutocompleteCryptoChipsComponentModule {
}
