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
  MatOptionModule,
  MatSelectModule,
  MatAutocompleteModule,
  MatCheckboxModule,
  MatTableModule
} from "@angular/material";
import { SatDatepickerModule, SatNativeDateModule } from "saturn-datepicker";

import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenesCompraComponent } from './pages/ordenes-compra/ordenes-compra.component';

@NgModule({
  declarations: [AppComponent, OrdenesCompraComponent],
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
    MatTableModule,
    MatCheckboxModule,
    MatOptionModule,
    MatSelectModule,
    MatAutocompleteModule,

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
