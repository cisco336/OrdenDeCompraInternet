import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, throwError } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import {
  MatDialogRef,
  MatDialog,
  MatDialogConfig,
  MatCheckbox
} from '@angular/material';
import { DialogDetallesComponent } from '../../components/dialog-detalles/dialog-detalles.component';
import { DialogCambioEstadoComponent } from '../../components/dialog-cambio-estado/dialog-cambio-estado.component';
import { MatPaginator } from '@angular/material/paginator';
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { RequireMatch } from './customValidators';
import {
  animate,
  state,
  style,
  transition,
  trigger,
  query,
  stagger,
  animateChild
} from '@angular/animations';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import { ExportAsExcelFileService } from 'src/app/services/export-as-excel-file.service';
import { ComponentsService } from 'src/app/services/components.service';
import {
  Estado,
  Proveedores,
  OrdenDeCompra
} from '../../interfaces/interfaces';
import { HostListener } from '@angular/core';
import * as moment from 'moment';
import * as constants from '../../constants/constants';

@Component({
  selector: 'app-ordenes-compra',
  templateUrl: './ordenes-compra.component.html',
  styleUrls: ['./ordenes-compra.component.scss'],
  animations: [
    trigger('entering', [
      transition('* <=> *', [
        // each time the binding value changes
        query(
          ':leave',
          [
            stagger(100, [
              animate(
                '0.5s',
                style({ opacity: 0, transform: 'translateY(-100px)' })
              )
            ]),
            query('@child', [animateChild()], { optional: true })
          ],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0, transform: 'translateY(100px)' }),
            stagger(50, [
              animate('0.5s', style({ opacity: 1, transform: 'translateY(0)' }))
            ]),
            query('@child', [animateChild()], { optional: true })
          ],
          { optional: true }
        )
      ])
    ]),
    trigger('child', [
      state(
        'true',
        style({ transform: 'translateX(0)', opacity: 1, height: '*' })
      ),
      state(
        'false',
        style({ transform: 'translateX(200px)', opacity: 0, height: 0 })
      ),
      transition('0 => 1', animate('.5s ease-out')),
      transition('1 => 0', animate('.5s ease-out'))
    ]),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ]),
    trigger('fade', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('.2s ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(
          ':leave',
          [stagger(100, [animate('0.5s', style({ opacity: 0 }))])],
          { optional: true }
        ),
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            stagger(100, [animate('0.5s', style({ opacity: 1 }))])
          ],
          { optional: true }
        )
      ])
    ])
  ]
})
export class OrdenesCompraComponent implements OnInit, OnDestroy {
  queryDetallesDialog: {
    p_transaccion: string; //Actualizar orden 'UO', 'US' => actualizar SKU
    p_pmg_po_number: string;
    p_vpc_tech_key: string;
    p_fecha_inicio: string;
    p_fecha_fin: string;
    p_fecha_real: string;
    p_id_estado: string;
    p_origen: string;
    p_usuario: string;
  };
  aux: any;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  mainFilterForm: FormGroup;
  proveedores: Proveedores[] = [];
  estados: Estado[] = [];
  expandedElement: OrdenDeCompra;
  displayedColumns: string[] = [
    'Select',
    'PMG_PO_NUMBER',
    'ESTADO',
    'FECHA_CREACION',
    'PMG_EXP_RCT_DATE'
  ];
  screenHeight: number = 0;
  screenWidth: number = 0;
  dataSource;
  selection = new SelectionModel<OrdenDeCompra>(true, []);

  proveedor: string;
  tableMessage: string = '';
  date: any;
  filteredProveedores: Observable<Proveedores[]>;
  filteredEstados: Observable<Estado[]>;

  fechaInicioSubscription;
  fechaFinSubscription;
  routeSubscription;
  proveedoresControlSubscription;

  usr: string = '';
  key: string = '';
  TOKEN: string = '';

  isLoading: boolean = true;
  noData: boolean = false;
  render: boolean = false;

  // Textos
  tooltips = constants.tooltips;
  matFormFieldText = constants.matFormFieldText;
  errorMessagesText = constants.errorMessagesText;
  strings = constants.strings;

  errorMessage: string = '';

  constructor(
    public _dialog: MatDialog,
    _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    private _route: ActivatedRoute,
    private _dataService: DataService,
    private _excelExport: ExportAsExcelFileService,
    private _componentService: ComponentsService
  ) {
    // Validators
    this.mainFilterForm = _formBuilder.group({
      proveedorControl: ['', [Validators.required, RequireMatch]],
      estadosControl: ['', [Validators.required, RequireMatch]],
      fechaInicioControl: [
        moment().subtract(1, 'months'),
        [Validators.required]
      ],
      fechaFinControl: [moment(), [Validators.required]]
    });
    this.onResize();
  }

  exportXlsx() {
    this._excelExport.exportAsExcelFile(
      this.dataSource.data,
      'Ordenes_de_compra_' + this.proveedor
    );
  }

  ngOnInit() {
    this.isLoading = true;
    this.routeSubscription = this._route.queryParams;
    this.routeSubscription.subscribe(
      params => {
        if (!params['token'] || !params['token'].split(';')[0]) {
          this.usr = '';
          this.isLoading = false;
          this.errorMessage = this.errorMessagesText.noPrivileges;
        } else {
          this.errorMessage = '';
          this.usr = params['token'].split(';')[0];
          this._componentService.setUser(this.usr);
          this.appStart();
        }
      },
      error => {
        this.isLoading = false;
        this.noData = true;
        this.errorMessage = `${
          this.errorMessagesText.noPrivileges
        }. ${error.statusText || error.status}`;
      }
    );
  }

  appStart(key?) {
    this.isLoading = true;
    this._dataService
      .getProveedores()
      .toPromise()
      .then(
        data => {
          if (!data['Estado'] || !data['Value'][0]['Código']) {
            this.proveedores = data['Value'];
            this.filteredProveedores = this.mainFilterForm
              .get('proveedorControl')
              .valueChanges.pipe(
                startWith(''),
                map(value =>
                  typeof value === 'string' ? value : value.DESCRIPCION
                ),
                map(descripcion =>
                  descripcion
                    ? this._filterProveedor(descripcion)
                    : this.proveedores.slice()
                )
              );
            if (this.proveedores.length === 1) {
              this.mainFilterForm
                .get('proveedorControl')
                .setValue(this.proveedores[0]);
              this.mainFilterForm.get('proveedorControl').disable();
              this.proveedor = this.proveedores[0]['NOMBRE_PROVEEDOR'];
            } else {
              this.proveedoresControlSubscription = this.mainFilterForm
                .get('proveedorControl')
                .valueChanges.subscribe(data => {
                  this.proveedor = data.DESCRIPCION;
                });
            }
            this._dataService
              .getEstados()
              .toPromise()
              .then(
                data => {
                  if (!data['Estado'] || !data['Value'][0]['Código']) {
                    this._componentService.setEstados(data['Value']);
                    this.estados = data['Value'];
                    this.mainFilterForm
                      .get('estadosControl')
                      .setValue(this.estados[0]);
                    this.isLoading = false;
                    this._componentService.setEstados(this.estados);
                    this.filteredEstados = this.mainFilterForm
                      .get('estadosControl')
                      .valueChanges.pipe(
                        startWith(''),
                        map(value =>
                          typeof value === 'string' ? value : value.DESCRIPCION
                        ),
                        map(descripcion =>
                          descripcion
                            ? this._filterEstados(descripcion)
                            : this.estados.slice()
                        )
                      );
                  } else {
                    throw throwError(Error);
                  }
                },
                error => {
                  this.errorHandling(error);
                  this.mainFilterForm
                    .get('estadosControl')
                    .setErrors({ incorrect: true });
                  this.mainFilterForm.get('estadosControl').disable();
                }
              );
            this.fechaInicioSubscription = this.mainFilterForm
              .get('fechaInicioControl')
              .valueChanges.subscribe(() => {
                this.compareDates();
              });
            this.fechaFinSubscription = this.mainFilterForm
              .get('fechaFinControl')
              .valueChanges.subscribe(() => {
                this.compareDates();
              });

            this.render = true;
          } else {
            throw throwError('Error');
          }
        },
        error => {
          this.errorHandling(error);
          this.mainFilterForm
            .get('proveedorControl')
            .setErrors({ incorrect: true });
          this.mainFilterForm.get('proveedorControl').disable();
        }
      );
  }

  errorHandling(error) {
    let toastrError;
    switch (error.status) {
      case 0:
        toastrError = this.errorMessagesText.error0;
        break;
      case 401:
        toastrError = this.errorMessagesText.error401;
        break;
      case 404:
        toastrError = this.errorMessagesText.error404;
        break;
      case 500:
        toastrError = this.errorMessagesText.error500;
        break;
      default:
        toastrError = this.errorMessagesText.errorUnknown;
        break;
    }
    this._toastr.error(toastrError);
    this.noData = true;
    this.isLoading = false;
  }

  ngOnDestroy() {
    this.fechaInicioSubscription.unsubscribe();
    this.fechaFinSubscription.unsubscribe();
    this.proveedoresControlSubscription.unsubscribe();
  }

  consultar() {
    this.isLoading = true;
    if (this.dataSource !== undefined) {
      this.dataSource.data = [];
    }
    let form = this.mainFilterForm;
    let query = {
      p_transaccion: 'GE',
      p_pmg_po_number: -1,
      p_prd_lvl_child: -1,
      p_vpc_tech_key: form.get('proveedorControl').value['ID'],
      p_fecha_inicio: form.get('fechaInicioControl').value.format('DD/MM/YYYY'),
      p_fecha_fin: form.get('fechaFinControl').value.format('DD/MM/YYYY'),
      p_fecha_real: '-1',
      p_id_estado: form.get('estadosControl').value.ID,
      p_origen: '-1',
      p_usuario: this.usr
    };
    this._dataService
      .postTablaPrincipalOC(query)
      .toPromise()
      .then(
        data => {
          this.tableMessage = '';
          this.dataSource = new MatTableDataSource();
          if (data['Value'] && data['Value'][0]['Código']) {
            this.dataSource._data.next([]);
            this.tableMessage = data['Value'][0]['Mensaje'];
          } else {
            this.tableMessage = '';
            this.dataSource.data = data['Value'];
          }
          setTimeout(() => {
            this.dataSource.paginator = this.paginator;
            this.isLoading = false;
          }, 0);
        },
        error => {
          this.errorHandling(error);
        }
      );
  }

  compareDates() {
    let form = this.mainFilterForm;
    if (
      this.mainFilterForm &&
      new Date(form.get('fechaFinControl').value) <
        new Date(form.get('fechaInicioControl').value)
    ) {
      form.get('fechaInicioControl').setErrors({ incorrect: true });
      form.get('fechaFinControl').setErrors({ incorrect: true });
      this._toastr.error(this.errorMessagesText.startEndDateError);
    } else {
      if (this.mainFilterForm.get('fechaInicioControl').value !== '') {
        form.get('fechaInicioControl').setErrors(null);
      }
      if (this.mainFilterForm.get('fechaFinControl').value !== '') {
        form.get('fechaFinControl').setErrors(null);
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
  checkboxLabel(row?: OrdenDeCompra): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row[
      'Orden'
    ] + 1}`;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  displayProveedor(data?: Proveedores): string | undefined {
    return data ? data.DESCRIPCION : undefined;
  }
  displayEstados(data?: Estado): string | undefined {
    return data ? data.DESCRIPCION : undefined;
  }
  private _filterProveedor(DESCRIPCION: string): Proveedores[] {
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

  // Cuando se actualiza el SKU se debe enviar PRD_LVL_CHILD
  // EL SKU ES EL PRD_LVL_NUMBER
  getOrdenDetalle(data, event) {
    if (!this.aux) {
      this.aux = true;
      let form = this.mainFilterForm;
      let query = {
        p_transaccion: 'GD', //Actualizar orden 'UO', 'US' => actualizar SKU
        p_pmg_po_number: data.PMG_PO_NUMBER,
        p_vpc_tech_key: form.get('proveedorControl').value['ID'],
        p_fecha_inicio: form
          .get('fechaInicioControl')
          .value.format('DD/MM/YYYY'),
        p_fecha_fin: form.get('fechaFinControl').value.format('DD/MM/YYYY'),
        p_fecha_real: '-1',
        p_id_estado: form.get('estadosControl').value.ID,
        p_origen: '-1',
        p_usuario: this.usr
      };
      this.queryDetallesDialog = query;
      this._dataService
        .postTablaPrincipalOC(query)
        .toPromise()
        .then(
          result => {
            this.aux = false;
            if (result) {
              this.openDialogDetalles(result['Value']);
            }
          },
          error => {
            this.aux = false;
            this.errorHandling(error);
          }
        );
    }
  }
  openDialogDetalles(data): Observable<any> {
    this._componentService.setQueryDetalles(this.queryDetallesDialog);
    const dialogRef = this._dialog.open(DialogDetallesComponent, {
      maxWidth: '95vw',
      width: '95vw',
      maxHeight: '95vh',
      data: {
        data: {
          queryDetalles: this.queryDetallesDialog,
          ordenCompra: data,
          usr: this.usr,
          estados: this.estados
        }
      },
      panelClass: 'dialog-detalles',
      disableClose: false
    });

    return dialogRef.afterClosed();
  }

  cambioEstadoDialog() {
    this.openDialogCambioEstado()
      .toPromise()
      .then(() => {
        this.consultar();
        this.selection.clear();
      });
  }

  openDialogCambioEstado(): Observable<any> {
    const dialogRef = this._dialog.open(DialogCambioEstadoComponent, {
      maxWidth: '90vw',
      maxHeight: '90vh',
      data: {
        data: {
          selected: this.selection.selected,
          usr: this.usr,
          proveedor: null
        }
      },
      panelClass: 'dialog-detalles',
      disableClose: true
    });

    return dialogRef.afterClosed();
  }
}
