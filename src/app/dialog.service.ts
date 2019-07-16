import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { EditComponent } from './edit/edit.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

   public editSubtask(node): Observable<any> {
   let dialogRef: MatDialogRef<EditComponent>;
   dialogRef = this.dialog.open(EditComponent);
   dialogRef.componentInstance.node = node;
   return dialogRef.afterClosed();
 }

}
