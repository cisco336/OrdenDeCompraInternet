import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { RequireMatch } from 'src/app/pages/ordenes-compra/customValidators';
import { ComponentsService } from 'src/app/services/components.service';
import { Estado } from '../../interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import {
  trigger,
  transition,
  query,
  animate,
  style,
  animateChild,
  state
} from '@angular/animations';

@Component({
  selector: 'app-dialog-cambio-estado',
  templateUrl: './dialog-cambio-estado.component.html',
  styleUrls: ['./dialog-cambio-estado.component.scss'],
  animations: [
    trigger('show', [
      state('true', style({ margin: '1rem', opacity: 1, height: '*' })),
      state('false', style({ margin: '0', opacity: 0, height: 0 })),
      transition('false <=> true', animate('.2s ease-out'))
    ])
  ]
})
export class DialogCambioEstadoComponent implements OnInit {
  filteredEstados: Observable<Estado[]>;
  background: string;
  color: string;
  chips: any[] = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;
  estadosControl = new FormControl('', [Validators.required, RequireMatch]);
  responseMessage: string = '';
  estados: Estado[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogCambioEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private _componentService: ComponentsService,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    this.chips = this.data.data.selected;
    this.background = this.background ? '' : 'primary';
    this.color = this.color ? '' : 'accent';
    this.estados = this._componentService.getEstados().value;
    this.filteredEstados = this.estadosControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.DESCRIPCION)),
      map(descripcion =>
        descripcion ? this._filterEstado(descripcion) : this.estados.slice()
      )
    );
  }

  private _filterEstado(data: string): Estado[] {
    const filterValue = data.toLowerCase();

    return this.estados.filter(
      option => option.DESCRIPCION.toLowerCase().indexOf(filterValue) >= 0
    );
  }

  remove(chip): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
      if (!this.chips.length) {
        setTimeout(() => this.closeDialog(), 3000);
      }
    }
  }

  cambiarEstados() {
    let query = {
      p_transaccion: 'UO',
      p_pmg_po_number: this.chips[0].PMG_PO_NUMBER,
      p_vpc_tech_key: '-1',
      p_fecha_inicio: '-1',
      p_fecha_fin: '-1',
      p_id_estado: this.estadosControl.value.ID,
      p_origen: '-1',
      p_usuario: this.data.data.usr
    };
    console.log(JSON.stringify(query));
    this._dataService
      .postTablaPrincipalOC(query)
      .toPromise()
      .then(response => {
        console.log(response);
        this.responseMessage = response['Mensaje'];
        setTimeout(() => {
          this.responseMessage = '';
        }, 5000);
      });
  }

  displayEstados(data?: Estado): string | undefined {
    return data ? data.DESCRIPCION : undefined;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
