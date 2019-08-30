import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  ElementRef
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
export class TablaDetallesComponent implements OnInit, OnDestroy {
  screenHeight: number = 0;
  screenWidth: number = 0;
  strings = strings;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    console.log(
      window.innerWidth,
      this.table['_elementRef'].nativeElement.clientWidth
    );
    let tableWidth = this.table['_elementRef'].nativeElement.clientWidth;
    if ((tableWidth + 55) < this.screenWidth) {
      console.log('add')
      this.displayedColumns = [...this.displayedColumnsBackup];
    }

    if ((tableWidth + 30) > this.screenWidth) {
      console.log('pop')
      this.displayedColumns.pop();
    }
  }
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('table', { static: true }) table: ElementRef;
  displayedNames: string[] = [
    'sku',
    'Código de barras',
    'SKU descripción',
    'Estado',
    'Fecha  Despacho',
    'Fecha Entrega',
    'Fecha modificaión'
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
  expandedElement: DetalleOrdenDeCompra | null;
  selection = new SelectionModel<DetalleOrdenDeCompra>(true, []);
  constructor(private _componentService: ComponentsService) {}

  ngOnInit() {
    this.onResize();
    this.dataSource = new MatTableDataSource<DetalleOrdenDeCompra>();
    this._componentService.getTablaDetalles().subscribe(data => {
      this.dataSource.data = data['Value'];
      this.selection.clear();
    });
    this.dataSource.data = this._componentService.getTablaDetalles().value;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0);
    this.selection.onChange.subscribe(() => {
      this.setSkus(this.selection.selected);
    });
  }

  ngOnDestroy() {
    // this._componentService.getTablaDetalles().unsubscribe();
    // this.selection.onChange.unsubscribe();
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
}
