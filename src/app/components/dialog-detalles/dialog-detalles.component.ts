import { Component, OnInit, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {
  DetalleOrdenDeCompra,
  Estado,
  InfoBaseOC
} from 'src/app/interfaces/interfaces';
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
import { DataService } from 'src/app/services/data.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { BottomSheetImgComponent } from '../bottom-sheet-img/bottom-sheet-img.component';
import * as strings from '../../constants/constants';

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
        style({
          position: 'relative',
          transform: 'translateY(0)',
          visibility: 'visible'
        })
      ),
      state(
        'false',
        style({
          position: 'absolute',
          transform: 'translateY(-200px)',
          visibility: 'hidden'
        })
      ),
      transition('0 <=> 1', animate('.2s ease-out'))
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
  public infoBaseOC: InfoBaseOC = {
    CEDULA: 0,
    CLIENTE: '',
    TELEFONOS: '',
    DIRECCION_CTE: '',
    CIUDAD_CTE: '',
    DIRECCION_ENTREGA: '',
    CIUDAD_ENTREGA: '',
    PMG_PO_NUMBER: 0,
    TIPO_ENTREGA: '',
    STICKER: '',
    ORIGEN: '',
    NOTA_PEDIDO: '',
    PROVEEDOR: '',
    GUIA: '',
    CUMPLIDO: '',
    TRANSPORTADORA: ''
  };
  numeroOrden: number = 0;
  strings = strings;
  cliente: boolean;
  entrega: boolean;
  observaciones: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogDetallesComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _componentService: ComponentsService,
    private _dataService: DataService,
    private _bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.estados = this.data.data.estados;
    this.ordenCompra = this.data.data.ordenCompra;
    this._dataService
      .GetInfoBaseOc(this.ordenCompra[0].PMG_PO_NUMBER)
      .toPromise()
      .then(data => {
        this.infoBaseOC = { ...data['Value'][0] };
        if (this.infoBaseOC['Código'] === '4') {
          this.cliente = false;
          this.entrega = false;
        } else {
          this.cliente =
            this.infoBaseOC.CEDULA === undefined &&
            this.infoBaseOC.TELEFONOS === undefined &&
            this.infoBaseOC.DIRECCION_CTE === undefined &&
            this.infoBaseOC.CIUDAD_CTE === undefined
              ? false
              : true;
          this.entrega =
            this.infoBaseOC.DIRECCION_ENTREGA === undefined &&
            this.infoBaseOC.CIUDAD_ENTREGA === undefined &&
            this.infoBaseOC.TRANSPORTADORA === undefined &&
            this.infoBaseOC.GUIA === undefined &&
            this.infoBaseOC.CUMPLIDO === undefined
              ? false
              : true;
        }
        this._componentService.setInfoBaseOC(this.infoBaseOC);
      });
    this.numeroOrden = this.ordenCompra[0].PMG_PO_NUMBER;
    this._componentService.setTablaDetalles(this.ordenCompra);
    this.background = this.background ? '' : 'primary';
    this.color = this.color ? '' : 'accent';
    this._componentService.getSelectedSku().subscribe(data => {
      this.skus = data;
    });
  }

  openBottomSheet(): void {
    this._bottomSheet.open(BottomSheetComponent, {
      data: { estados: this.estados }
    });
  }

  cambioEstado(estado) {
    let query = {
      p_transaccion: 'US',
      p_pmg_po_number: null,
      p_prd_lvl_child: null,
      p_vpc_tech_key: '-1',
      p_fecha_inicio: '-1',
      p_fecha_fin: '-1',
      p_id_estado: estado,
      p_origen: '-1',
      p_usuario: this.data.data.usr
    };
    this.skus.forEach(data => {
      query.p_pmg_po_number = data.PMG_PO_NUMBER;
      query.p_prd_lvl_child = data.PRD_LVL_CHILD;
      this._dataService
        .postTablaPrincipalOC(query)
        .toPromise()
        .then();
    });
    this.refreshTable();
  }

  refreshTable() {
    this._dataService
      .postTablaPrincipalOC(this.data.data.queryDetalles)
      .toPromise()
      .then(data => {
        this._componentService.setTablaDetalles(data);
      });
  }

  showImg(data) {
    console.log(data);
    window.open(data, '_blank');
  }

  openBottomSheetImg(img): void {
    let sheet = this._bottomSheet.open(BottomSheetImgComponent, {
      data: { img: img, minWidth: '100vw', width: '100vw' },
      disableClose: false
    });
    sheet
      .afterDismissed()
      .toPromise()
      .then(
        response => {
          if (response && response['ID'] > 0) {
            this.cambioEstado(response);
          }
        },
        error => {
          console.log(error);
        }
      );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
