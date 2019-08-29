import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
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
  MatToolbarModule,
  MatChipsModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
  MatRippleModule,
  MatListModule,
  MatLineModule,
  MatMenuModule,
  MatBottomSheetModule,
  MatPaginatorIntl,
} from '@angular/material';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';
import { MatTableExporterModule } from 'mat-table-exporter';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrdenesCompraComponent } from './pages/ordenes-compra/ordenes-compra.component';
import { DialogDetallesComponent } from './components/dialog-detalles/dialog-detalles.component';
import { StepperDetallesComponent } from './components/stepper-detalles/stepper-detalles.component';
import { DialogCambioEstadoComponent } from './components/dialog-cambio-estado/dialog-cambio-estado.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TablaDetallesComponent } from './components/tabla-detalles/tabla-detalles.component';
import { ToastrModule } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { BottomSheetComponent } from './components/bottom-sheet/bottom-sheet.component';
import { TrackingComponent } from './components/tracking/tracking.component';
import { BottomSheetImgComponent } from './components/bottom-sheet-img/bottom-sheet-img.component';
import { getSpanishPaginatorIntl } from './spanishPaginator';

@NgModule({
  declarations: [
    AppComponent,
    OrdenesCompraComponent,
    DialogDetallesComponent,
    StepperDetallesComponent,
    DialogCambioEstadoComponent,
    TablaDetallesComponent,
    BottomSheetComponent,
    TrackingComponent,
    BottomSheetImgComponent
  ],
  entryComponents: [
    DialogDetallesComponent,
    DialogCambioEstadoComponent,
    BottomSheetComponent,
    BottomSheetImgComponent
  ],
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
    MatChipsModule,
    MatSelectModule,
    MatOptionModule,
    MatTableExporterModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatRippleModule,
    MatListModule,
    MatLineModule,
    MatMenuModule,
    MatBottomSheetModule,

    HttpClientModule,
    RouterModule.forRoot([]),

    // DatePicker Range
    SatDatepickerModule,
    SatNativeDateModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Toastr notifications
    ToastrModule.forRoot()
  ],
  providers: [{provide: MatPaginatorIntl, useValue: getSpanishPaginatorIntl()}],
  bootstrap: [AppComponent]
})
export class AppModule {}
