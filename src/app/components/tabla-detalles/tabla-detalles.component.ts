import { Component, OnInit, ViewChild } from '@angular/core';
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
export class TablaDetallesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    'Select',
    'PRD_LVL_NUMBER',
    'PRD_NAME_FULL',
    'ESTADO',
    'FECHA_CREACION',
    'PMG_SHIP_DATE',
    'PMG_SHIP_DATE1',
    'FECHA_MODIFICACION',
    'PRD_UPC',
  ];
  dataSource;
  expandedElement: DetalleOrdenDeCompra | null;
  selection = new SelectionModel<DetalleOrdenDeCompra>(true, []);
  constructor(private _componentService: ComponentsService) {}
  
  ngOnInit() {
    this.dataSource = new MatTableDataSource<DetalleOrdenDeCompra>();
    this._componentService.getTablaDetalles().subscribe(data => {
      this.dataSource.data = data["Value"];
      this.selection.clear();
    });
    this.dataSource.data = this._componentService.getTablaDetalles().value;
    setTimeout(() => {
      this.dataSource.paginator = this.paginator;
    }, 0)
    this.selection.onChange.subscribe(() => {
      this.setSkus(this.selection.selected);
    });
  }

  setSkus(data) {
    this._componentService.setSelectedSku(data);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
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
