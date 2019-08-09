import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-cambio-estado',
  templateUrl: './dialog-cambio-estado.component.html',
  styleUrls: ['./dialog-cambio-estado.component.scss']
})
export class DialogCambioEstadoComponent implements OnInit {

  background: string;
  color: string;

  constructor(public dialogRef: MatDialogRef<DialogCambioEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    this.background = this.background ? '' : 'primary';
    this.color = this.color ? '' : 'accent';
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
