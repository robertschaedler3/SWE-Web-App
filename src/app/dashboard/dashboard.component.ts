import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { CreateEventDialogComponent } from '../create-event-dialog/create-event-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { StevensEvent } from '../models/event.model';
import { AuthService } from '../services/auth.service';
import { take, map, tap } from 'rxjs/operators';

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
  ) { }

  ngOnInit() {
  }

  public createEvent() {
    const dialogRef = this.dialog.open(CreateEventDialogComponent, {
      width: '500px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: StevensEvent) => {
      this.events.createEvent(result);
      // this.api.createEvent(result).subscribe(result => console.log(result));
    });
  }

}
