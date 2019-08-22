import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  selectedSku = new BehaviorSubject<any>('');
  estados = new BehaviorSubject<any>('');
  tablaDetalle = new BehaviorSubject<any>('');

  constructor() { }

  setSelectedSku(data) {
    this.selectedSku.next(data);
  }

  getSelectedSku() {
    return this.selectedSku;
  }

  setEstados(data) {
    this.estados.next(data);
  }

  getEstados() {
    return this.estados;
  }

  setTablaDetalles(data) {
    this.tablaDetalle.next(data);
  }

  getTablaDetalles() {
    return this.tablaDetalle;
  }
}
