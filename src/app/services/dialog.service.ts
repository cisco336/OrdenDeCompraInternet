import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { MatDialogRef, MatDialog, MatDialogConfig, MatBottomSheet } from '@angular/material';
import { DialogDetallesComponent } from '../components/dialog-detalles/dialog-detalles.component';
import { DialogCambioEstadoComponent } from '../components/dialog-cambio-estado/dialog-cambio-estado.component';
import { GenerateOrderGuideComponent } from '../components/generate-order-guide/generate-order-guide.component';
import { PackageUpdateConfirmComponent } from '../components/package-update-confirm/package-update-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(public dialog: MatDialog, public bottomSheet: MatBottomSheet) {}
  openDetalle(data): Observable<any> {
    const dialogRef = this.dialog.open(DialogDetallesComponent, data);

    return dialogRef.afterClosed();
  }
  openCambioEstado(data): Observable<any> {
    const dialogRef = this.dialog.open(DialogCambioEstadoComponent, data);

    return dialogRef.afterClosed();
  }
  openGuiaOrden(data): Observable<any> {
    const dialogRef = this.dialog.open(GenerateOrderGuideComponent, data);

    return dialogRef.afterClosed();
  }
  openPackageUpdateSheet(data?): Observable<any> {
    const sheetRef = this.bottomSheet.open(PackageUpdateConfirmComponent, data);

    return sheetRef.afterDismissed();
  }
}
