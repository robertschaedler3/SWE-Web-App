import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { CreateEventComponent } from '../create-event/create-event.component';

@Component({
  selector: 'app-create',
  templateUrl: 'create.component.html',
  styleUrls: ['create.component.scss'],
})
export class CreateComponent {

  constructor(
    public dialog: MatDialog
  ) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateComponentDialog, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
  }

}

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['create.component.scss'],
})
export class CreateComponentDialog {

  @ViewChild(CreateEventComponent) createComponent: CreateEventComponent;

  constructor(
    public dialogRef: MatDialogRef<CreateComponentDialog>
  ) { }

  create() {
    // TODO: Wait for event to be created before exiting
    this.createComponent.create()
    this.dialogRef.close({ success: true });
  }

  // TODO: confirm dialog exit before submitting

}
