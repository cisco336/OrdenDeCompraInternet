import { Component, OnInit, ViewChild } from "@angular/core";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "@angular/animations";
import { SelectionModel } from "@angular/cdk/collections";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { ComponentsService } from 'src/app/services/components.service';

@Component({
  selector: "app-tabla-detalles",
  templateUrl: "./tabla-detalles.component.html",
  styleUrls: ["./tabla-detalles.component.scss"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class TablaDetallesComponent implements OnInit {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = [
    "Select",
    "Orden",
    "Fecha_creacion",
    "Fecha_despacho",
    "Fecha_entrega"
  ];
  expandedElement: PeriodicElement | null;
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);
  constructor(private _componentService: ComponentsService) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.selection.onChange.subscribe(() => {
      this.setSkus(this.selection.selected);
    })
  }

  setSkus(data) {
    this._componentService.setSelectedSku(data);
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${row[
      "Orden"
    ] + 1}`;
  }
}

export interface PeriodicElement {
  Orden: number;
  "Fecha creación": string;
  "Fecha despacho": number;
  "Fecha entrega": string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Orden: 1,
    "Fecha creación": "Hydrogen",
    "Fecha despacho": 1.0079,
    "Fecha entrega": "H"
  },
  {
    Orden: 2,
    "Fecha creación": "Helium",
    "Fecha despacho": 4.0026,
    "Fecha entrega": "He"
  },
  {
    Orden: 3,
    "Fecha creación": "Lithium",
    "Fecha despacho": 6.941,
    "Fecha entrega": "Li"
  },
  {
    Orden: 4,
    "Fecha creación": "Beryllium",
    "Fecha despacho": 9.0122,
    "Fecha entrega": "Be"
  },
  {
    Orden: 5,
    "Fecha creación": "Boron",
    "Fecha despacho": 10.811,
    "Fecha entrega": "B"
  },
  {
    Orden: 6,
    "Fecha creación": "Carbon",
    "Fecha despacho": 12.0107,
    "Fecha entrega": "C"
  },
  {
    Orden: 7,
    "Fecha creación": "Nitrogen",
    "Fecha despacho": 14.0067,
    "Fecha entrega": "N"
  },
  {
    Orden: 8,
    "Fecha creación": "Oxygen",
    "Fecha despacho": 15.9994,
    "Fecha entrega": "O"
  },
  {
    Orden: 9,
    "Fecha creación": "Fluorine",
    "Fecha despacho": 18.9984,
    "Fecha entrega": "F"
  },
  {
    Orden: 10,
    "Fecha creación": "Neon",
    "Fecha despacho": 20.1797,
    "Fecha entrega": "Ne"
  },
  {
    Orden: 11,
    "Fecha creación": "Sodium",
    "Fecha despacho": 22.9897,
    "Fecha entrega": "Na"
  },
  {
    Orden: 12,
    "Fecha creación": "Magnesium",
    "Fecha despacho": 24.305,
    "Fecha entrega": "Mg"
  },
  {
    Orden: 13,
    "Fecha creación": "Aluminum",
    "Fecha despacho": 26.9815,
    "Fecha entrega": "Al"
  },
  {
    Orden: 14,
    "Fecha creación": "Silicon",
    "Fecha despacho": 28.0855,
    "Fecha entrega": "Si"
  },
  {
    Orden: 15,
    "Fecha creación": "Phosphorus",
    "Fecha despacho": 30.9738,
    "Fecha entrega": "P"
  },
  {
    Orden: 16,
    "Fecha creación": "Sulfur",
    "Fecha despacho": 32.065,
    "Fecha entrega": "S"
  },
  {
    Orden: 17,
    "Fecha creación": "Chlorine",
    "Fecha despacho": 35.453,
    "Fecha entrega": "Cl"
  },
  {
    Orden: 18,
    "Fecha creación": "Argon",
    "Fecha despacho": 39.948,
    "Fecha entrega": "Ar"
  },
  {
    Orden: 19,
    "Fecha creación": "Potassium",
    "Fecha despacho": 39.0983,
    "Fecha entrega": "K"
  },
  {
    Orden: 20,
    "Fecha creación": "Calcium",
    "Fecha despacho": 40.078,
    "Fecha entrega": "Ca"
  }
];
