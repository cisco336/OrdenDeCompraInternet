import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-detalles',
  templateUrl: './dialog-detalles.component.html',
  styleUrls: ['./dialog-detalles.component.scss']
})
export class DialogDetallesComponent implements OnInit {

  background: string;
  color: string;

  constructor(public dialogRef: MatDialogRef<DialogDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.background = this.background ? '' : 'primary';
    this.color = this.color ? '' : 'accent';
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
