import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { FormAutocompleteMultiCarsComponent } from './form-autocomplete-multi-cars.component';

@NgModule({
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, CommonModule, MatButtonModule, MatAutocompleteModule, MatTableModule],
  declarations: [FormAutocompleteMultiCarsComponent],
  providers: [],
  exports: [FormAutocompleteMultiCarsComponent]
})
export class FormAutocompleteMultiCarsComponentModule {
}
