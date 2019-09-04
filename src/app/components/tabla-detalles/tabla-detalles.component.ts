import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  DoCheck
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ComponentsService } from 'src/app/services/components.service';
import { DetalleOrdenDeCompra } from '../../interfaces/interfaces';
import * as strings from '../../constants/constants';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-tabla-detalles',
  templateUrl: './tabla-detalles.component.html',
  styleUrls: ['./tabla-detalles.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class TablaDetallesComponent implements OnInit, DoCheck {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedNames: string[] = [
    strings.strings.sku,
    strings.strings.barCode,
    strings.strings.description,
    strings.strings.state,
    strings.strings.dispatchDate,
    strings.strings.deliverDate,
    strings.strings.editDate
  ];
  displayedColumnsBackup: string[] = [
    'Select',
    'PRD_LVL_NUMBER',
    'PRD_UPC',
    'PRD_NAME_FULL',
    'ESTADO',
    'PMG_SHIP_DATE',
    'PMG_SHIP_DATE1',
    'FECHA_MODIFICACION'
  ];
  displayedColumns: string[] = [...this.displayedColumnsBackup];
  displayedColumnsAux: string[] = this.displayedColumns.slice(1);
  dataSource;
  elementDetails: string[] = [
    'FECHA_CREACION',
    'NAME_FAMILIA',
    'ORG_NAME_FULL',
    'ORIGEN_DESC',
    'PMG_CANCEL_DATE',
    'PMG_EXP_RCT_DATE',
    'PMG_SELL_COST',
    'PMG_SELL_QTY',
    'PMG_STAT_NAME',
    'USR_CREACION',
    'PRD_NAME_FULL'
  ];
  jsonToBeUsed = [];

  expandedElement: DetalleOrdenDeCompra | null;
  selection = new SelectionModel<DetalleOrdenDeCompra>(true, []);
  @ViewChild('table', { static: true }) table: ElementRef;
  screenHeight = 0;
  screenWidth = 0;
  strings = strings;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    const tableWidth = this.table['_elementRef'].nativeElement.clientWidth;
    this.screenWidth = window.innerWidth;
    if (tableWidth + 55 < this.screenWidth) {
      this.displayedColumns = [...this.displayedColumnsBackup];
    }

    if (tableWidth + 30 > this.screenWidth) {
      if (this.displayedColumns.length > 3) {
        this.displayedColumns.pop();
        this.elementDetails.push(this.displayedColumns.pop());
      }
    }
  }

  constructor(private _componentService: ComponentsService) {}

  ngDoCheck() {
    this.onResize();
  }
  ngOnInit() {
    this.dataSource = new MatTableDataSource<DetalleOrdenDeCompra>();
    this._componentService.getTablaDetalles().subscribe(data => {
      this.dataSource.data = data['Value'];
      this.selection.clear();
      this.onResize();
    });
    this.dataSource.data = this._componentService.getTablaDetalles().value;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
    this.selection.changed.subscribe(() => {
      this.setSkus(this.selection.selected);
    });
  }

  setSkus(data) {
    this._componentService.setSelectedSku(data);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.selection.selected && this.dataSource.data) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: DetalleOrdenDeCompra): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row[
      'Orden'
    ] + 1}`;
  }
  details(x) {
    this.jsonToBeUsed = [];
    for (const type in x) {
      if (x) {
        const item = {};
        item['key'] = strings.detailsTable[type]
          ? strings.detailsTable[type]
          : null;
        item['value'] = x[type];
        if (item['key'] !== null) {
          this.jsonToBeUsed.push(item);
        }
      }
    }
  }
  isNumber(val, label) {
    return typeof val === 'number' && !this.isCost(label);
  }
  isCost(val) {
    return val === strings.strings.cost;
  }
}
