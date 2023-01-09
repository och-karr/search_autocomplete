import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable, combineLatest, map, of} from 'rxjs';
import { CryptoModel } from '../../models/crypto.model';
import { CryptoService } from '../../services/crypto.service';


@Component({
  selector: 'app-form-autocomplete-crypto-chips',
  styleUrls: ['./form-autocomplete-crypto-chips.component.scss'],
  templateUrl: './form-autocomplete-crypto-chips.component.html',
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormAutocompleteCryptoChipsComponent {

  readonly cryptoForm: FormGroup = new FormGroup({
    symbol: new FormControl()
  });

  readonly chipsArray$: FormArray = new FormArray([
    new FormControl(),
  ]);

  cryptoArray: string[] = [];
  cryptoArrayObs = of(this.cryptoArray);
  readonly cryptoList$: Observable<CryptoModel[]> = combineLatest([
    this._cryptoService.getAll(),
    this.cryptoForm.valueChanges
  ]).pipe(
      map(([crypto, formSymbol] : [CryptoModel[], any]) => {
        return crypto.filter((el) => el.symbol.toLowerCase().includes(formSymbol.symbol.toLowerCase()))
      })
  );

  constructor(private _cryptoService: CryptoService, private _formBuilder: FormBuilder) {
  }

  selectItem(symbol: string) {
    this.cryptoArray.push(symbol);
  }
}
