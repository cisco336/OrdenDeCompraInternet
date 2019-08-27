import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent implements OnInit {
  fechaCambioControl = new FormControl('', Validators.required);
  horaCambioControl = new FormControl('00:00', [Validators.required]);
  today = moment();
  constructor(
    private _bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit() { }
  closeSheet(data?) {
    let response = {
      ID: data.ID || -1,
      fecha_real: data.ID > 0 ? `${this.fechaCambioControl.value.format('DD/MM/YYYY')} ${this.horaCambioControl.value}` : null
    }
    debugger
    this._bottomSheetRef.dismiss(response);
  }
}
