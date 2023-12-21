import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-delete',
  templateUrl: './confirmation-delete.component.html',
  styleUrl: './confirmation-delete.component.css',
})
export class ConfirmationDeleteComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDeleteComponent>) {}
  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close(true);
  }
}
