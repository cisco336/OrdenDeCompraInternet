import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import * as strings from '../../constants/constants';

@Component({
  selector: 'app-package-update-confirm',
  templateUrl: './package-update-confirm.component.html',
  styleUrls: ['./package-update-confirm.component.scss']
})
export class PackageUpdateConfirmComponent implements OnInit {
  strings = strings;

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<PackageUpdateConfirmComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit() {
  }
  closeSheet(data?) {
    this._bottomSheetRef.dismiss(data);
  }
}
