import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { FormControl, Validators } from "@angular/forms";
import { startWith, map } from "rxjs/operators";
import { RequireMatch } from "src/app/pages/ordenes-compra/customValidators";

export interface Estado {
  ESTADO_ID: number;
  DESCRIPCION: string;
}

@Component({
  selector: "app-dialog-cambio-estado",
  templateUrl: "./dialog-cambio-estado.component.html",
  styleUrls: ["./dialog-cambio-estado.component.scss"]
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
  estadosControl = new FormControl("", [Validators.required, RequireMatch]);

  estados: Estado[] = [
    { ESTADO_ID: 1, DESCRIPCION: "Pendiente" },
    { ESTADO_ID: 2, DESCRIPCION: "Preparado" },
    { ESTADO_ID: 3, DESCRIPCION: "En transporte" },
    { ESTADO_ID: 4, DESCRIPCION: "Estado final" }
  ];

  constructor(
    public dialogRef: MatDialogRef<DialogCambioEstadoComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}

  ngOnInit() {
    this.chips = this.data.data.selected ? this.data.data.selected : {};
    this.background = this.background ? "" : "primary";
    this.color = this.color ? "" : "accent";

    this.filteredEstados = this.estadosControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.DESCRIPCION)),
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

  displayEstados(data?: Estado): string | undefined {
    return data ? data.DESCRIPCION : undefined;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
