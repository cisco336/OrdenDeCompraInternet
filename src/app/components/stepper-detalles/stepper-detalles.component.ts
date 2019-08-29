import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { ComponentsService } from 'src/app/services/components.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';
import { Estado } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import * as strings from '../../constants/constants';

@Component({
  selector: 'app-stepper-detalles',
  templateUrl: './stepper-detalles.component.html',
  styleUrls: ['./stepper-detalles.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class StepperDetallesComponent implements OnInit, OnDestroy {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  selectedSku;
  estadosSubscription;
  estados: Estado[] = [];
  strings = strings;

  constructor(
    private _formBuilder: FormBuilder,
    private _componentService: ComponentsService,
    private _bottomSheet: MatBottomSheet,
    private _dataService:  DataService
  ) {}

  ngOnInit() {
    this.estadosSubscription = this._componentService
      .getEstados()
      .subscribe(estados => (this.estados = estados));
    this.firstFormGroup = this._formBuilder.group({
      selectedSkuControl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this._componentService.getSelectedSku().subscribe(data => {
      this.selectedSku = data;
      if (this.selectedSku.length > 0) {
        this.firstFormGroup.get('selectedSkuControl').setErrors(null);
      } else {
        this.firstFormGroup
          .get('selectedSkuControl')
          .setErrors({ incorrect: true });
      }
    });
  }
  openBottomSheet(): void {
    let sheet = this._bottomSheet.open(BottomSheetComponent, {
      data: { estados: this.estados, minWidth: '95vw' }, disableClose: false
    });
    sheet.afterDismissed().toPromise().then(response => {
      if (response && response["ID"] > 0) {
        this.cambioEstado(response);
      }
    },
      error => {
        console.log(error);
    })
  }

  cambioEstado(response) {
    let query = {
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
      this._dataService
        .postTablaPrincipalOC(query)
        .toPromise()
        .then();
    });
    this.refreshTable();
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
    this.estadosSubscription.unsubscribe();
  }
}
