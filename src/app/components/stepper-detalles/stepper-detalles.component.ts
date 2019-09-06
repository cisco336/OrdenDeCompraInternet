import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ComponentsService } from 'src/app/services/components.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Estado } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import * as strings from '../../constants/constants';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stepper-detalles',
  templateUrl: './stepper-detalles.component.html',
  styleUrls: ['./stepper-detalles.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ],
  animations: [
    trigger('show', [
      state(
        'true',
        style({ transformOrigin: '50% 0%', opacity: 1, height: '*' })
      ),
      state(
        'false',
        style({ transformOrigin: '50% 0%', opacity: 0, height: 0 })
      ),
      transition('0 => 1', animate('.5s ease-out')),
      transition('1 => 0', animate('.5s ease-out'))
    ])
  ]
})
export class StepperDetallesComponent implements OnInit, OnDestroy {
  @Input() details: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedSku;
  estadosSubscription: Subscription;
  getSelectedSkuSubscription: Subscription;
  estados: Estado[] = [];
  strings = strings;
  queryResponse = '';
  showQueryResponse = false;
  oc: any;
  skus: any;
  selectedSkuSubscription: Subscription;

  constructor(
    private _formBuilder: FormBuilder,
    private _componentService: ComponentsService,
    private _bottomSheet: MatBottomSheet,
    private _dataService: DataService
  ) {}

  ngOnInit() {
    if (this.details) {
      this.hasDetails();
    } else {
      this.noDetails();
    }
  }

  hasDetails() {
    this.estadosSubscription = this._componentService
      .getEstados()
      .subscribe(estados => (this.estados = estados));
    this.firstFormGroup = this._formBuilder.group({
      selectedSkuControl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.selectedSkuSubscription = this._componentService.getSelectedSku().subscribe(skus => this.selectedSku = skus);
  }

  noDetails() {
    const detalleOC = this._componentService.getDetalleOC().value;
    this.oc = detalleOC[0]['PMG_PO_NUMBER'];
    this.skus = detalleOC.map(
      number =>
        (number = {
          sku: number['PRD_LVL_NUMBER'],
          description: number['PRD_NAME_FULL']
        })
    );
  }
  openBottomSheet(): void {
    const sheet = this._bottomSheet.open(BottomSheetComponent, {
      data: { estados: this.estados, minWidth: '95vw' },
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
          this.showQueryResponse = true;
          this.queryResponse = strings.errorMessagesText.errorUnknown;
          setTimeout(() => (this.showQueryResponse = false), 2000);
        }
      );
  }

  cambioEstado(response) {
    const query = {
      p_transaccion: 'US',
      p_pmg_po_number: null,
      p_prd_lvl_child: null,
      p_vpc_tech_key: '-1',
      p_fecha_inicio: '-1',
      p_fecha_fin: '-1',
      p_fecha_real: response.fecha_real,
      p_id_estado: response.ID,
      p_origen: '-1',
      p_usuario: this._componentService.getUser().value
    };
    this.selectedSku.forEach(data => {
      query.p_pmg_po_number = data.PMG_PO_NUMBER;
      query.p_prd_lvl_child = data.PRD_LVL_CHILD;
      const postTablaPrincipalOC = this._dataService
        .postTablaPrincipalOC(query)
        .toPromise()
        .then(
          resolve => {
            this.showQueryResponse = true;
            this.queryResponse = resolve['Mensaje'];
            setTimeout(() => (this.showQueryResponse = false), 5000);
            this.refreshTable();
          },
          reject => {
            this.showQueryResponse = true;
            this.queryResponse = reject['Mensaje'];
            setTimeout(() => (this.showQueryResponse = false), 5000);
            this.refreshTable();
          }
        );
    });
  }

  refreshTable() {
    this._dataService
      .postTablaPrincipalOC(this._componentService.getQueryDetalles().value)
      .toPromise()
      .then(data => {
        this._componentService.setTablaDetalles(data);
      });
  }

  ngOnDestroy() {
    if (this.estadosSubscription) {
      this.estadosSubscription.unsubscribe();
      this.selectedSkuSubscription.unsubscribe();
    }
  }
}
