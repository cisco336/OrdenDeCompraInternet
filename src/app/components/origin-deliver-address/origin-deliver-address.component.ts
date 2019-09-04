import { Component, OnInit } from '@angular/core';
import * as strings from '../../constants/constants';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-origin-deliver-address',
  templateUrl: './origin-deliver-address.component.html',
  styleUrls: ['./origin-deliver-address.component.scss']
})
export class OriginDeliverAddressComponent implements OnInit {
  strings = strings;
  addresses;

  constructor(_formBuilder: FormBuilder) {
    this.addresses = _formBuilder.group({
      originAddress: ['', Validators.required],
      originCity: ['', Validators.required]
    });
  }

  ngOnInit() {}
}
