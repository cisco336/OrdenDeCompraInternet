import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { DetalleOrdenDeCompra } from 'src/app/interfaces/interfaces';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-dialog-detalles',
  templateUrl: './dialog-detalles.component.html',
  styleUrls: ['./dialog-detalles.component.scss']
})
export class DialogDetallesComponent implements OnInit {
  background: string;
  color: string;
  ordenCompra: DetalleOrdenDeCompra[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _componentService: ComponentsService
  ) {}

  ngOnInit() {
    this.ordenCompra = this.data.data.ordenCompra;
    this._componentService.setTablaDetalles(this.ordenCompra);
    this.background = this.background ? '' : 'primary';
    this.color = this.color ? '' : 'accent';
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
