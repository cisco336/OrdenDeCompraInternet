import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import * as strings from '../../constants/constants';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { filter } from 'rxjs/operators';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-generate-order-guide',
  templateUrl: './generate-order-guide.component.html',
  styleUrls: ['./generate-order-guide.component.scss']
})
export class GenerateOrderGuideComponent implements OnInit, OnDestroy {
  strings = strings;
  alert: string;
  skus: number[];
  oc: number;
  stepSkus;
  stepBultos;

  constructor(
    public dialogRef: MatDialogRef<GenerateOrderGuideComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    _formBuilder: FormBuilder
  ) {
    this.stepSkus = _formBuilder.group({
      skusContinue: [false, Validators.required]
    });
    this.stepBultos = _formBuilder.group({});
    }

  ngOnInit() {
    this.oc = this.data.data.ordenCompra[0]['PMG_PO_NUMBER'];
    this.skus = this.data.data.ordenCompra.map(
      number =>
        (number = {
          sku: number['PRD_LVL_NUMBER'],
          description: number['PRD_NAME_FULL']
        })
    );
    console.log(this.skus);
  }

  ngOnDestroy() {
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
