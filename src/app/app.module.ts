import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatDatepickerModule,
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatIconModule,
  MatCardModule,
  MatTabsModule,
  MatStepperModule,
  MatOptionModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatTableModule,
  MatDialogModule,
  MatPaginatorModule,
  MatToolbarModule
} from "@angular/material";
import { SatDatepickerModule, SatNativeDateModule } from "saturn-datepicker";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenesCompraComponent } from './pages/ordenes-compra/ordenes-compra.component';
import { DialogDetallesComponent } from './components/dialog-detalles/dialog-detalles.component';
import { StepperDetallesComponent } from './components/stepper-detalles/stepper-detalles.component';
import { DialogCambioEstadoComponent } from './components/dialog-cambio-estado/dialog-cambio-estado.component';

@NgModule({
  declarations: [AppComponent, OrdenesCompraComponent, DialogDetallesComponent, StepperDetallesComponent, DialogCambioEstadoComponent],
  entryComponents: [DialogDetallesComponent, DialogCambioEstadoComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    // Material
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatTabsModule,
    MatStepperModule,
    MatTableModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatDialogModule,
    MatPaginatorModule,
    MatToolbarModule,

    // DatePicker Range
    SatDatepickerModule,
    SatNativeDateModule,

    // Forms
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
