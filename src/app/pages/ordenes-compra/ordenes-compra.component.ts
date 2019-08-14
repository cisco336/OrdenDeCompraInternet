import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatDialogRef, MatDialog, MatDialogConfig, MatCheckbox } from "@angular/material";
import { DialogDetallesComponent } from "../../components/dialog-detalles/dialog-detalles.component";
import { DialogCambioEstadoComponent } from "../../components/dialog-cambio-estado/dialog-cambio-estado.component";
import { MatPaginator } from "@angular/material/paginator";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { RequireMatch as RequireMatch } from './customValidators';
import {animate, state, style, transition, trigger} from '@angular/animations';


export interface PeriodicElement {
  "Orden": number;
  "Fecha creación": string;
  "Fecha despacho": number;
  "Fecha entrega": string;
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
    "Orden": 1,
    "Fecha creación": "Hydrogen",
    "Fecha despacho": 1.0079,
    "Fecha entrega": "H"
  },
  {
    "Orden": 2,
    "Fecha creación": "Helium",
    "Fecha despacho": 4.0026,
    "Fecha entrega": "He"
  },
  {
    "Orden": 3,
    "Fecha creación": "Lithium",
    "Fecha despacho": 6.941,
    "Fecha entrega": "Li"
  },
  {
    "Orden": 4,
    "Fecha creación": "Beryllium",
    "Fecha despacho": 9.0122,
    "Fecha entrega": "Be"
  },
  {
    "Orden": 5,
    "Fecha creación": "Boron",
    "Fecha despacho": 10.811,
    "Fecha entrega": "B"
  },
  {
    "Orden": 6,
    "Fecha creación": "Carbon",
    "Fecha despacho": 12.0107,
    "Fecha entrega": "C"
  },
  {
    "Orden": 7,
    "Fecha creación": "Nitrogen",
    "Fecha despacho": 14.0067,
    "Fecha entrega": "N"
  },
  {
    "Orden": 8,
    "Fecha creación": "Oxygen",
    "Fecha despacho": 15.9994,
    "Fecha entrega": "O"
  },
  {
    "Orden": 9,
    "Fecha creación": "Fluorine",
    "Fecha despacho": 18.9984,
    "Fecha entrega": "F"
  },
  {
    "Orden": 10,
    "Fecha creación": "Neon",
    "Fecha despacho": 20.1797,
    "Fecha entrega": "Ne"
  },
  {
    "Orden": 11,
    "Fecha creación": "Sodium",
    "Fecha despacho": 22.9897,
    "Fecha entrega": "Na"
  },
  {
    "Orden": 12,
    "Fecha creación": "Magnesium",
    "Fecha despacho": 24.305,
    "Fecha entrega": "Mg"
  },
  {
    "Orden": 13,
    "Fecha creación": "Aluminum",
    "Fecha despacho": 26.9815,
    "Fecha entrega": "Al"
  },
  {
    "Orden": 14,
    "Fecha creación": "Silicon",
    "Fecha despacho": 28.0855,
    "Fecha entrega": "Si"
  },
  {
    "Orden": 15,
    "Fecha creación": "Phosphorus",
    "Fecha despacho": 30.9738,
    "Fecha entrega": "P"
  },
  {
    "Orden": 16,
    "Fecha creación": "Sulfur",
    "Fecha despacho": 32.065,
    "Fecha entrega": "S"
  },
  {
    "Orden": 17,
    "Fecha creación": "Chlorine",
    "Fecha despacho": 35.453,
    "Fecha entrega": "Cl"
  },
  {
    "Orden": 18,
    "Fecha creación": "Argon",
    "Fecha despacho": 39.948,
    "Fecha entrega": "Ar"
  },
  {
    "Orden": 19,
    "Fecha creación": "Potassium",
    "Fecha despacho": 39.0983,
    "Fecha entrega": "K"
  },
  {
    "Orden": 20,
    "Fecha creación": "Calcium",
    "Fecha despacho": 40.078,
    "Fecha entrega": "Ca"
  }
];

@Component({
  selector: "app-ordenes-compra",
  templateUrl: "./ordenes-compra.component.html",
  styleUrls: ["./ordenes-compra.component.scss"],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrdenesCompraComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
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
  expandedElement: PeriodicElement;
  displayedColumns: string[] = [
    "Select",
    "Orden",
    "Fecha_creacion",
    "Fecha_despacho",
    "Fecha_entrega"
  ];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  proveedor = "";
  date: any;
  filteredProveedores: Observable<Proveedor[]>;
  filteredEstados: Observable<Estado[]>;

  fechaInicioSubscription;
  fechaFinSubscription;

  constructor(public _dialog: MatDialog, _formBuilder: FormBuilder) {
    // Validators
    this.mainFilterForm = _formBuilder.group({
      proveedorControl: ["",[Validators.required, RequireMatch]],
      estadosControl: ["", [Validators.required, RequireMatch]],
      fechaInicioControl: ["", [Validators.required]],
      fechaFinControl: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.filteredProveedores = this.mainFilterForm
      .get("proveedorControl")
      .valueChanges.pipe(
        startWith(""),
        map(value => (typeof value === "string" ? value : value.DESCRIPCION)),
        map(descripcion =>
          descripcion
            ? this._filterProveedor(descripcion)
            : this.proveedores.slice()
        )
      );
    this.filteredEstados = this.mainFilterForm.get("estadosControl").valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.DESCRIPCION)),
      map(descripcion =>
        descripcion ? this._filterEstados(descripcion) : this.estados.slice()
      )
    );
    this.fechaInicioSubscription = this.mainFilterForm.get("fechaInicioControl").valueChanges.subscribe(data => {
      this.compareDates();
    });
    this.fechaFinSubscription = this.mainFilterForm.get("fechaFinControl").valueChanges.subscribe(data => {
      this.compareDates();
    })
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.fechaInicioSubscription.unsubscribe();
    this.fechaFinSubscription.unsubscribe();
  }

  consultar(event) {
    console.log(this.mainFilterForm);
  }

  compareDates() {
    let form = this.mainFilterForm;
    if ((this.mainFilterForm) && (new Date(form.get("fechaFinControl").value) <= new Date(form.get("fechaInicioControl").value))) {
      form.get("fechaInicioControl").setErrors({ incorrect: true });
      form.get("fechaFinControl").setErrors({ incorrect: true });
    } else {
      form.get("fechaInicioControl").setErrors(null);
      form.get("fechaFinControl").setErrors(null);
    }
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
    } row ${row["Orden"] + 1}`;
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
      option => option.DESCRIPCION.toLowerCase().indexOf(filterValue) >= 0
    );
  }
  private _filterEstados(DESCRIPCION: string): Estado[] {
    const filterValue = DESCRIPCION.toLowerCase();

    return this.estados.filter(
      option => option.DESCRIPCION.toLowerCase().indexOf(filterValue) >= 0
    );
  }

  openDialogDetalles(data): Observable<any> {
    const dialogRef = this._dialog.open(DialogDetallesComponent, {
      width: "90vw",
      maxHeight: "90vh",
      data: { data: { data: data } },
      panelClass: "dialog-detalles",
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
  openDialogCambioEstado(data): Observable<any> {
    const dialogRef = this._dialog.open(DialogCambioEstadoComponent, {
      maxWidth: "90vw",
      maxHeight: "90vh",
      data: { data: { data: data, selected: this.selection.selected } },
      panelClass: "dialog-detalles",
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
}
