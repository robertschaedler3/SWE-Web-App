import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { Event } from '../interfaces/event.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    public api: EventService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.api.getEvents();
  }

  public createEvent() {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: Event) => {
      this.api.createEvent(result).subscribe(result => console.log(result));
    });
  }

}
