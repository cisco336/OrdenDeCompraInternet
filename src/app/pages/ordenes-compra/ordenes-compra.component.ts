import { Component, OnInit, ViewChild } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatDialogRef, MatDialog, MatDialogConfig } from "@angular/material";
import { DialogDetallesComponent } from "../../components/dialog-detalles/dialog-detalles.component";
import { DialogCambioEstadoComponent } from "../../components/dialog-cambio-estado/dialog-cambio-estado.component";
import { MatPaginator } from "@angular/material/paginator";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

export interface PeriodicElement {
  fechaCreacion: string;
  orden: number;
  fechaDespacho: number;
  fechaEntrega: string;
}

export interface Proveedor {
  PROVEEDOR_ID: number;
  DESCRIPCION: string;
}

export interface Estado {
  ESTADO_ID: number;
  DESCRIPCION: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    orden: 1,
    fechaCreacion: "Hydrogen",
    fechaDespacho: 1.0079,
    fechaEntrega: "H"
  },
  {
    orden: 2,
    fechaCreacion: "Helium",
    fechaDespacho: 4.0026,
    fechaEntrega: "He"
  },
  {
    orden: 3,
    fechaCreacion: "Lithium",
    fechaDespacho: 6.941,
    fechaEntrega: "Li"
  },
  {
    orden: 4,
    fechaCreacion: "Beryllium",
    fechaDespacho: 9.0122,
    fechaEntrega: "Be"
  },
  {
    orden: 5,
    fechaCreacion: "Boron",
    fechaDespacho: 10.811,
    fechaEntrega: "B"
  },
  {
    orden: 6,
    fechaCreacion: "Carbon",
    fechaDespacho: 12.0107,
    fechaEntrega: "C"
  },
  {
    orden: 7,
    fechaCreacion: "Nitrogen",
    fechaDespacho: 14.0067,
    fechaEntrega: "N"
  },
  {
    orden: 8,
    fechaCreacion: "Oxygen",
    fechaDespacho: 15.9994,
    fechaEntrega: "O"
  },
  {
    orden: 9,
    fechaCreacion: "Fluorine",
    fechaDespacho: 18.9984,
    fechaEntrega: "F"
  },
  {
    orden: 10,
    fechaCreacion: "Neon",
    fechaDespacho: 20.1797,
    fechaEntrega: "Ne"
  },
  {
    orden: 11,
    fechaCreacion: "Sodium",
    fechaDespacho: 22.9897,
    fechaEntrega: "Na"
  },
  {
    orden: 12,
    fechaCreacion: "Magnesium",
    fechaDespacho: 24.305,
    fechaEntrega: "Mg"
  },
  {
    orden: 13,
    fechaCreacion: "Aluminum",
    fechaDespacho: 26.9815,
    fechaEntrega: "Al"
  },
  {
    orden: 14,
    fechaCreacion: "Silicon",
    fechaDespacho: 28.0855,
    fechaEntrega: "Si"
  },
  {
    orden: 15,
    fechaCreacion: "Phosphorus",
    fechaDespacho: 30.9738,
    fechaEntrega: "P"
  },
  {
    orden: 16,
    fechaCreacion: "Sulfur",
    fechaDespacho: 32.065,
    fechaEntrega: "S"
  },
  {
    orden: 17,
    fechaCreacion: "Chlorine",
    fechaDespacho: 35.453,
    fechaEntrega: "Cl"
  },
  {
    orden: 18,
    fechaCreacion: "Argon",
    fechaDespacho: 39.948,
    fechaEntrega: "Ar"
  },
  {
    orden: 19,
    fechaCreacion: "Potassium",
    fechaDespacho: 39.0983,
    fechaEntrega: "K"
  },
  {
    orden: 20,
    fechaCreacion: "Calcium",
    fechaDespacho: 40.078,
    fechaEntrega: "Ca"
  }
];

@Component({
  selector: "app-ordenes-compra",
  templateUrl: "./ordenes-compra.component.html",
  styleUrls: ["./ordenes-compra.component.scss"]
})
export class OrdenesCompraComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // proveedorControl = new FormControl({ value: "" }, Validators.required);
  estadosControl = new FormControl({ value: "" }, Validators.required);
  mainFilterForm: FormGroup;
  proveedores: Proveedor[] = [
    { PROVEEDOR_ID: 1, DESCRIPCION: "Proveedor 1" },
    { PROVEEDOR_ID: 2, DESCRIPCION: "Proveedor 2" },
    { PROVEEDOR_ID: 3, DESCRIPCION: "Proveedor 3" },
    { PROVEEDOR_ID: 4, DESCRIPCION: "Proveedor 4" }
  ];
  estados: Estado[] = [
    { ESTADO_ID: 1, DESCRIPCION: "Estado 1" },
    { ESTADO_ID: 2, DESCRIPCION: "Estado 2" },
    { ESTADO_ID: 3, DESCRIPCION: "Estado 3" },
    { ESTADO_ID: 4, DESCRIPCION: "Estado 4" }
  ];

  displayedColumns: string[] = [
    "select",
    "orden",
    "fechaCreacion",
    "fechaDespacho",
    "fechaEntrega"
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  proveedor = "";
  date: any;
  filteredProveedores: Observable<Proveedor[]>;
  filteredEstados: Observable<Estado[]>;

  constructor(public _dialog: MatDialog, _formBuilder: FormBuilder) {
    // Validators
    this.mainFilterForm = _formBuilder.group({
      proveedorControlName: [{value: ""}, Validators.required],
    });
  }

  ngOnInit() {
    this.filteredProveedores = this.mainFilterForm.get("proveedorControlName").valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.DESCRIPCION)),
      map(descripcion => (descripcion ? this._filterProveedor(descripcion) : this.proveedores.slice()))
    );
    this.filteredEstados = this.estadosControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.DESCRIPCION)),
      map(descripcion => (descripcion ? this._filterEstados(descripcion) : this.estados.slice()))
    );
    this.dataSource.paginator = this.paginator;
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
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.orden + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayProveedor(data?: Proveedor): string | undefined {
    return data ? data.DESCRIPCION : undefined;
  }
  displayEstados(data?: Estado): string | undefined {
    return data ? data.DESCRIPCION : undefined;
  }
  private _filterProveedor(DESCRIPCION: string): Proveedor[] {
    const filterValue = DESCRIPCION.toLowerCase();

    return this.proveedores.filter(
      option => option.DESCRIPCION.toLowerCase().indexOf(filterValue) === 0
    );
  }
  private _filterEstados(DESCRIPCION: string): Estado[] {
    const filterValue = DESCRIPCION.toLowerCase();

    return this.estados.filter(
      option => option.DESCRIPCION.toLowerCase().indexOf(filterValue) === 0
    );
  }

  openDialogDetalles(data): Observable<any> {
    const dialogRef = this._dialog.open(DialogDetallesComponent, {
      width: "90vw",
      data: { data: { data: data } },
      panelClass: "dialog-detalles",
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
  openDialogCambioEstado(data): Observable<any> {
    const dialogRef = this._dialog.open(DialogCambioEstadoComponent, {
      maxWidth: "90vw",
      data: { data: { data: data, selected: this.selection.selected } },
      panelClass: "dialog-detalles",
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
}
