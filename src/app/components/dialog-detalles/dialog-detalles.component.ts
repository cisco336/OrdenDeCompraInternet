import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import { DetalleOrdenDeCompra, Estado } from 'src/app/interfaces/interfaces';
import { ComponentsService } from 'src/app/services/components.service';
import {
  trigger,
  state,
  query,
  animateChild,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-dialog-detalles',
  templateUrl: './dialog-detalles.component.html',
  styleUrls: ['./dialog-detalles.component.scss'],
  animations: [
    trigger('cardGroup', [
      state('true', style({ opacity: 1, height: '*' })),
      state('false', style({ opacity: 0, height: 0 })),
      transition('*<=>*', [
        animate('5s ease-out'),
        query('*', [query('@card', [animateChild()], { optional: true })], {
          optional: true
        })
      ])
    ]),
    trigger('card', [
      state(
        'true',
        style({ position: 'relative', transform: 'translateY(0), opacity: 1' })
      ),
      state(
        'false',
        style({
          position: 'absolute',
          transform: 'translateY(-200px), opacity: 0'
        })
      ),
      transition('*<=>*', animate('.2s ease-out'))
    ])
  ]
})
export class DialogDetallesComponent implements OnInit {
  background: string;
  color: string;
  ordenCompra: DetalleOrdenDeCompra[] = [];
  estados: Estado[] = [];
  mostrarCambioBotton: boolean = false;
  skus: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _componentService: ComponentsService
  ) {}

  ngOnInit() {
    this.estados = this.data.data.estados;
    this.ordenCompra = this.data.data.ordenCompra;
    this._componentService.setTablaDetalles(this.ordenCompra);
    this.background = this.background ? '' : 'primary';
    this.color = this.color ? '' : 'accent';
    this._componentService.getSelectedSku()
      .subscribe(data => {
        debugger
        this.skus = data;
        this.mostrarCambioBotton = data.length;
      });
  }

  cambioEstado(estado) {
    console.log('cambio de estado: ' + estado);
    debugger
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
