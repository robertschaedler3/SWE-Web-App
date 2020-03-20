import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { CreateEventDialogComponent, DialogResult } from '../create-event-dialog/create-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { StevensEvent } from '../models/event.model';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { EventDetailsDialogComponent } from '../event-details-dialog/event-details-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public events: EventService,
    public dialog: MatDialog
  ) {
    this.events.getEvents();
  }

  ngOnInit() {
  }

  public createEvent(user: User) {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '500px',
      data: { author: user.displayName, uid: user.uid }
    });

    dialogRef.afterClosed().subscribe((result: DialogResult) => {
      if (result) this.events.createEvent(result);
    });
  }

  public displayDetails(data) {
    this.dialog.open(EventDetailsDialogComponent, {
      width: '800px',
      data: data
    });
  }

}
