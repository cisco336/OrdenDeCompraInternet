import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComponentsService {

  selectedSku = new BehaviorSubject<any>('');

  constructor() { }

  setSelectedSku(data) {
    this.selectedSku.next(data);
  }

  getSelectedSku() {
    return this.selectedSku;
  }
}
