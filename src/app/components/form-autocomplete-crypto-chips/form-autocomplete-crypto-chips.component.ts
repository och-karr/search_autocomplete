import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Observable, combineLatest, tap, map} from 'rxjs';
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

  // readonly chipsArray$: FormArray = new FormArray([
  //   new FormControl(null),
  // ]);

  // chipsArray = this._formBuilder.array([]);


  readonly cryptoList$: Observable<CryptoModel[]> = combineLatest([
    this._cryptoService.getAll(),
    this.cryptoForm.valueChanges
  ]).pipe(
      tap(console.log),
      map(([crypto, formSymbol] : [CryptoModel[], any]) => {
        // this.chipsArray.push(formSymbol.symbol);
        return crypto.filter((el) => el.symbol.toLowerCase().includes(formSymbol.symbol.toLowerCase()))
      })
  );

  // readonly cryptoList$: Observable<CryptoModel[]> = combineLatest([
  //   this._cryptoService.getAll(),
  //   this.cryptoFormValues$
  // ]).pipe(
  //   tap(console.log),
  //   map(([crypto, formSymbol] : [CryptoModel[], any]) => {
  //     crypto.filter((el) =>
  //       // el.symbol.toLowerCase().includes(formSymbol ? formSymbol.toLowerCase() : '')
  //       el.symbol.toLowerCase().includes(formSymbol.symbol ? formSymbol.symbol.toLowerCase() : '')
  //     )
  //   })
  // );


  constructor(private _cryptoService: CryptoService, private _formBuilder: FormBuilder) {
  }
}
