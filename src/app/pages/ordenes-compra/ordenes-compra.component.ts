import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
  MatCheckbox
} from "@angular/material";
import { DialogDetallesComponent } from "../../components/dialog-detalles/dialog-detalles.component";
import { DialogCambioEstadoComponent } from "../../components/dialog-cambio-estado/dialog-cambio-estado.component";
import { MatPaginator } from "@angular/material/paginator";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { RequireMatch } from "./customValidators";
import {
  animate,
  state,
  style,
  transition,
  trigger,
  query,
  stagger
} from "@angular/animations";
import { ToastrService } from "ngx-toastr";
import { DataService } from "src/app/services/data.service";
import { ExportAsExcelFileService } from "src/app/services/export-as-excel-file.service";

export interface PeriodicElement {
  Orden: number;
  "Fecha creación": string;
  "Fecha despacho": number;
  "Fecha entrega": string;
  "Estado orden": string;
  "Almacen a entregar": string;
  "Fecha real de entrega": string;
  Valor: number;
  "Consecutivo nota pedido": string;
  "Estado nota pedido": string;
  "Tipo de entrega": string;
  "Operador (transportadora)": string;
  "Estado de integración": string;
  "Fecha de integración": string;
}

export interface Proveedor {
  ACTIVO: string;
  EMAIL: string;
  NOMBRE_PROVEEDOR: string;
  PROVEEDOR_ID: number;
}

export interface Estado {
  ESTADO_ID: number;
  DESCRIPCION: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Orden: 1,
    "Fecha creación": "Hydrogen",
    "Fecha despacho": 1.0079,
    "Fecha entrega": "H",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 2,
    "Fecha creación": "Helium",
    "Fecha despacho": 4.0026,
    "Fecha entrega": "He",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 3,
    "Fecha creación": "Lithium",
    "Fecha despacho": 6.941,
    "Fecha entrega": "Li",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 4,
    "Fecha creación": "Beryllium",
    "Fecha despacho": 9.0122,
    "Fecha entrega": "Be",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 5,
    "Fecha creación": "Boron",
    "Fecha despacho": 10.811,
    "Fecha entrega": "B",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 6,
    "Fecha creación": "Carbon",
    "Fecha despacho": 12.0107,
    "Fecha entrega": "C",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 7,
    "Fecha creación": "Nitrogen",
    "Fecha despacho": 14.0067,
    "Fecha entrega": "N",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 8,
    "Fecha creación": "Oxygen",
    "Fecha despacho": 15.9994,
    "Fecha entrega": "O",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 9,
    "Fecha creación": "Fluorine",
    "Fecha despacho": 18.9984,
    "Fecha entrega": "F",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 10,
    "Fecha creación": "Neon",
    "Fecha despacho": 20.1797,
    "Fecha entrega": "Ne",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 11,
    "Fecha creación": "Sodium",
    "Fecha despacho": 22.9897,
    "Fecha entrega": "Na",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 12,
    "Fecha creación": "Magnesium",
    "Fecha despacho": 24.305,
    "Fecha entrega": "Mg",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 13,
    "Fecha creación": "Aluminum",
    "Fecha despacho": 26.9815,
    "Fecha entrega": "Al",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 14,
    "Fecha creación": "Silicon",
    "Fecha despacho": 28.0855,
    "Fecha entrega": "Si",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 15,
    "Fecha creación": "Phosphorus",
    "Fecha despacho": 30.9738,
    "Fecha entrega": "P",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 16,
    "Fecha creación": "Sulfur",
    "Fecha despacho": 32.065,
    "Fecha entrega": "S",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 17,
    "Fecha creación": "Chlorine",
    "Fecha despacho": 35.453,
    "Fecha entrega": "Cl",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 18,
    "Fecha creación": "Argon",
    "Fecha despacho": 39.948,
    "Fecha entrega": "Ar",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 19,
    "Fecha creación": "Potassium",
    "Fecha despacho": 39.0983,
    "Fecha entrega": "K",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  },
  {
    Orden: 20,
    "Fecha creación": "Calcium",
    "Fecha despacho": 40.078,
    "Fecha entrega": "Ca",
    "Estado orden": "string",
    "Almacen a entregar": "string",
    "Fecha real de entrega": "string",
    Valor: 123456,
    "Consecutivo nota pedido": "string",
    "Estado nota pedido": "string",
    "Tipo de entrega": "string",
    "Operador (transportadora)": "string",
    "Estado de integración": "string",
    "Fecha de integración": "string"
  }
];

@Component({
  selector: "app-ordenes-compra",
  templateUrl: "./ordenes-compra.component.html",
  styleUrls: ["./ordenes-compra.component.scss"],
  animations: [
    trigger("entering", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(100px)" }),
        animate(
          ".5s ease-out",
          style({ opacity: 1, transform: "translateY(0px)" })
        )
      ]),
      transition(":leave", [
        style({ opacity: 1, transform: "trnaslateY(0px)" }),
        animate(
          ".2s ease-out",
          style({ opacity: 0, transform: "translateY(-100px)" })
        )
      ])
    ]),
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ]),
    trigger("fade", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate(".2s ease-out", style({ opacity: 1 }))
      ])
    ]),
    trigger("listAnimation", [
      transition("* => *", [
        // each time the binding value changes
        query(
          ":leave",
          [stagger(100, [animate("0.5s", style({ opacity: 0 }))])],
          { optional: true }
        ),
        query(
          ":enter",
          [
            style({ opacity: 0 }),
            stagger(100, [animate("0.5s", style({ opacity: 1 }))])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class OrdenesCompraComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  mainFilterForm: FormGroup;
  proveedores: Proveedor[] = [];
  estados: Estado[] = [
    { ESTADO_ID: 1, DESCRIPCION: "Pendiente" },
    { ESTADO_ID: 2, DESCRIPCION: "Preparado" },
    { ESTADO_ID: 3, DESCRIPCION: "En transporte" },
    { ESTADO_ID: 4, DESCRIPCION: "Estado final" }
  ];
  expandedElement: PeriodicElement;
  displayedColumns: string[] = [
    "Select",
    "Orden",
    "Estado orden",
    "Fecha creación",
    "Fecha entrega"

    // Abajo
    // "Fecha despacho",
    // "Almacen a entregar",
    // "Fecha real de entrega",
    // "Valor",
    // "Consecutivo nota pedido",
    // "Estado nota pedido",
    // "Tipo de entrega",
    // "Operador (transportadora)",
    // "Estado de integración",
    // "Fecha de integración"
  ];
  dataSource ;
  selection = new SelectionModel<PeriodicElement>(true, []);

  proveedor: string = "";
  date: any;
  filteredProveedores: Observable<Proveedor[]>;
  filteredEstados: Observable<Estado[]>;

  fechaInicioSubscription;
  fechaFinSubscription;
  routeSubscription;

  usr: string = "";
  key: string = "";
  TOKEN: string = "";

  isLoading: boolean = false;
  noData: boolean = false;

  optionsInfo: string =
    "Cambiar estado: debe seleccionar (con el checkbox) las ordenes a las que desea cambiar el estado. Generar reporte: genera un archivo .xlsx (Excel) que contiene toda la información presentada en la tabla.";

  mainFilterInfo: string =
    "La fecha final no puede ser anterior a la inicial. Todos los campos son obligatorios.";

  tableFilterInfo: string =
    "El valor indicado se utilizará como filtro en toda la información de la tabla.";

  checkBoxInfo: string =
    "Seleccione para habilitar la opción 'Cambio de Estado', puede seleccionar/deseleccionar todos con este check principal o sleccionar/deseleccionar cada orden de compra por separado";

  tableFooterClick: string =
    "Haga clic sobre el número de orden para mostrar los detalles. ";

  tableFooterDblclick: string =
    "Haga DOBLE clic sobre cualquier otra parte de la fila para mostrar más información sobre la orden.";

  errorMessage: string = "";

  constructor(
    public _dialog: MatDialog,
    _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _route: ActivatedRoute,
    private _dataService: DataService,
    private _excelExport: ExportAsExcelFileService
  ) {
    // Validators
    this.mainFilterForm = _formBuilder.group({
      proveedorControl: ["", [Validators.required, RequireMatch]],
      estadosControl: ["", [Validators.required, RequireMatch]],
      fechaInicioControl: ["", [Validators.required]],
      fechaFinControl: ["", [Validators.required]]
    });
  }

  exportXlsx() {
    this._excelExport.exportAsExcelFile(
      this.dataSource.data,
      "Ordenes_de_compra_" + this.proveedor
    );
  }

  ngOnInit() {
    this.dataSource = new MatTableDataSource;
    this.isLoading = true;
    this.routeSubscription = this._route.queryParams;
    this.routeSubscription.subscribe(params => {
      if (params["token"]) {
        if (
          !params["token"].split(";")[0] ||
          !params["token"].split(";")[1] ||
          !params["token"].split(";")[2]
        ) {
          this._toastr.error("Datos de inicio de sesión incorrectos.");
          this.usr = '';
          this.isLoading = false;
          this.errorMessage = "Usted no tiene privilegios";
        } else {
          this.usr = params["token"].split(";")[0];
          this.key = params["token"].split(";")[1];
          this.TOKEN = params["token"].split(";")[2];
          this.appStart(this.key);
        }
        // if (this.TOKEN) {
        //   let theToken: string = "";
        //   try {
        //     theToken = atob(this.TOKEN);
        //     this.dataService.setToken(theToken);
        //   } catch (error) {
        //     this.toastr.error("Error al decodificar token");
        //   }
        //   this.dataService.getAutorizar().subscribe(
        //     data => {
        //       if (data) {
        //         this.appStart(this.key);
        //       }
        //     },
        //     error => {
        //       switch (error.status) {
        //         case 401:
        //           this._toastr.warning("Usuario No autorizado.");
        //           break;
        //         case 500:
        //           this._toastr.error("Error en el servicio de autorización.");
        //           break;
        //         default:
        //           this._toastr.error("Error de comunicación.");
        //           break;
        //       }
        //     }
        //   );
        // }
      } else {
        this.isLoading = this.usr !== "";
        this.errorMessage = "Usted no tiene privilegios."
      }
    });
  }

  appStart(key?) {
    this._dataService
      .getDatosProveedor(key)
      .toPromise()
      .then(
        data => {
          if (!data["Value"][0]["Código"]) {
            this.proveedores = data["Value"];
            this.isLoading = false;
            this.filteredProveedores = this.mainFilterForm
              .get("proveedorControl")
              .valueChanges.pipe(
                startWith(""),
                map(value =>
                  typeof value === "string" ? value : value.DESCRIPCION
                ),
                map(descripcion =>
                  descripcion
                    ? this._filterProveedor(descripcion)
                    : this.proveedores.slice()
                )
              );
            if (this.proveedores.length === 1) {
              this.mainFilterForm
                .get("proveedorControl")
                .setValue(this.proveedores[0]);
              this.mainFilterForm.get("proveedorControl").disable();
              this.proveedor = this.proveedores[0]["NOMBRE_PROVEEDOR"];
            }
            this.filteredEstados = this.mainFilterForm
              .get("estadosControl")
              .valueChanges.pipe(
                startWith(""),
                map(value =>
                  typeof value === "string" ? value : value.DESCRIPCION
                ),
                map(descripcion =>
                  descripcion
                    ? this._filterEstados(descripcion)
                    : this.estados.slice()
                )
              );
            this.fechaInicioSubscription = this.mainFilterForm
              .get("fechaInicioControl")
              .valueChanges.subscribe(() => {
                this.compareDates();
              });
            this.fechaFinSubscription = this.mainFilterForm
              .get("fechaFinControl")
              .valueChanges.subscribe(() => {
                this.compareDates();
              });
            this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
            this.dataSource.paginator = this.paginator;
          } else {
            this.noData = true;
            this.isLoading = false;
            this.errorMessage = "No se encontraron datos."
          }
        },
        error => {
          this._toastr.error(error);
        }
      );
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
    if (
      this.mainFilterForm &&
      new Date(form.get("fechaFinControl").value) <=
        new Date(form.get("fechaInicioControl").value)
    ) {
      form.get("fechaInicioControl").setErrors({ incorrect: true });
      form.get("fechaFinControl").setErrors({ incorrect: true });
      this._toastr.error(
        "Fecha fin no puede ser anterior a la fecha de inicio."
      );
    } else {
      if (this.mainFilterForm.get("fechaInicioControl").value !== "") {
        form.get("fechaInicioControl").setErrors(null);
      }
      if (this.mainFilterForm.get("fechaFinControl").value !== "") {
        form.get("fechaFinControl").setErrors(null);
      }
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
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row[
      "Orden"
    ] + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayProveedor(data?: Proveedor): string | undefined {
    return data ? data.NOMBRE_PROVEEDOR : undefined;
  }
  displayEstados(data?: Estado): string | undefined {
    return data ? data.DESCRIPCION : undefined;
  }
  private _filterProveedor(DESCRIPCION: string): Proveedor[] {
    const filterValue = DESCRIPCION.toLowerCase();

    return this.proveedores.filter(
      option => option.NOMBRE_PROVEEDOR.toLowerCase().indexOf(filterValue) >= 0
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
