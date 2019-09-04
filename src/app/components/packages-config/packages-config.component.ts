import { Component, OnInit, OnDestroy } from '@angular/core';
import * as strings from '../../constants/constants';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material';
import { Bultos } from 'src/app/interfaces/interfaces';
import { ComponentsService } from 'src/app/services/components.service';
import {
  trigger,
  state,
  style,
  transition,
  animate
} from '@angular/animations';

@Component({
  selector: 'app-packages-config',
  templateUrl: './packages-config.component.html',
  styleUrls: ['./packages-config.component.scss'],
  animations: [
    trigger('table', [
      state('true', style({ opacity: 1, transform: 'translateY(0)' })),
      state('false', style({ opacity: 0, transform: 'translateY(-100px)' })),
      transition('0 <=> 1', animate('.2s ease-out'))
    ])
  ]
})
export class PackagesConfigComponent implements OnInit, OnDestroy {
  strings = strings;
  packagesForm = new FormGroup({
    unities: new FormControl('', [Validators.required])
  });
  displayedColumns: any[] = [];
  displayedNames: any[] = [];
  dataSource;

  // mocked
  bultos: Bultos[] = [
    { PESO: 100, VOLUMEN: 100, DECLARADO: 100 },
    { PESO: 200, VOLUMEN: 200, DECLARADO: 200 },
    { PESO: 300, VOLUMEN: 300, DECLARADO: 300 }
  ];

  constructor(private _componentService: ComponentsService) {}

  ngOnInit() {
    this.displayedColumns = ['PESO', 'VOLUMEN', 'DECLARADO'];
    this.displayedNames = [
      this.strings.strings.weight,
      this.strings.strings.volumne,
      this.strings.strings.declared
    ];
    this.dataSource = new MatTableDataSource<Bultos>();
    // this._componentService.getInfoBaseOC().subscribe(data => console.log(data, this.dataSource.data));
  }

  ngOnDestroy() {
    // this._componentService.getInfoBaseOC().unsubscribe();
  }

  generatePackages(x) {
    this.dataSource.data = this.bultos;
    console.log(x, this.dataSource.data);
  }
}
