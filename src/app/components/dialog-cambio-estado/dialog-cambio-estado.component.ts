import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA
} from "@angular/material/dialog";

@Component({
  selector: "app-dialog-cambio-estado",
  templateUrl: "./dialog-cambio-estado.component.html",
  styleUrls: ["./dialog-cambio-estado.component.scss"]
})
export class DialogCambioEstadoComponent implements OnInit {
  background: string;
  color: string;
  chips: any[] = [];
  visible: boolean = true;
  selectable: boolean = true;
  removable: boolean = true;
  addOnBlur: boolean = true;

  estados = [
    { value: '1', viewValue: 'Pendiente' , icon: 'av_timer'},
    { value: '2', viewValue: 'Preparado' , icon: 'thumb_up'},
    { value: '3', viewValue: 'En transporte' , icon: 'local_shipping'},
    { value: '4', viewValue: 'Estado final' , icon: 'check'}
  ]

  constructor(
    public dialogRef: MatDialogRef<DialogCambioEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.chips = this.data.data.selected ? this.data.data.selected : {};
    this.background = this.background ? "" : "primary";
    this.color = this.color ? "" : "accent";
  }

  remove(chip): void {
    const index = this.chips.indexOf(chip);

    if (index >= 0) {
      this.chips.splice(index, 1);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
