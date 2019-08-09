import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-detalles',
  templateUrl: './dialog-detalles.component.html',
  styleUrls: ['./dialog-detalles.component.scss']
})
export class DialogDetallesComponent implements OnInit {

  background: string;
  color: string;

  constructor() { }

  ngOnInit() {
    this.background = this.background ? '' : 'primary';
    this.color = this.color ? '' : 'accent';
  }

}
