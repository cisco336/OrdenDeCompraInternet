import { Component, OnInit } from '@angular/core';
import { TrackingObject } from 'src/app/interfaces/interfaces';
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit {
  items: TrackingObject = {
    ORIGEN: 'Sin datos',
    OBJECT_ID: 0,
    DESCRIPCION: 'Sin datos',
    FECHA_ESTADO: 'Sin datos',
    FECHA_CREACION: 'Sin datos',
    USR_CREACION: 'Sin datos',
    CAUSAL: 'Sin datos',
    DESCRIPCION_CAUSAL: 'Sin datos',
    SKU: 0,
    DESCRIPCION_SKU: 'Sin datos'
  };
  show: boolean = false;

  constructor(private _componentService: ComponentsService) {}

  ngOnInit() {

  }
}
