import { Component, OnInit } from '@angular/core';
import { TrackingObject } from '../../interfaces/interfaces';
import { ComponentsService } from 'src/app/services/components.service';
import * as strings from '../../constants/constants';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  strings = strings;
  items: TrackingObject = {
    DESCRIPCION_ESTADO_HO: '',
    DESCRIPCION_ESTADO_OC: '',
    FECHA_CREACION: '',
    FECHA_INTEGRACION: '',
    ID_ESTADO_HOMOLOGADO: 0,
    ID_ESTADO_OC: 0,
    USUARIO_CREACION: ''
  };
  show = false;

  constructor(private _componentService: ComponentsService) {}

  ngOnInit() {
    this.show = this._componentService.getTracking().value ? true : false;
    this.items = this._componentService.getTracking().value
      ? this._componentService.getTracking().value['Value'][0]
      : null;
  }
}
