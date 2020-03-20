import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { EventService } from '../services/event.service';
import { Tag } from '../models/tag.model';


@Component({
  selector: 'app-event-details-dialog',
  templateUrl: './event-details-dialog.component.html',
  styleUrls: ['./event-details-dialog.component.scss']
})
export class EventDetailsDialogComponent implements OnInit {

  tags$: Observable<Tag[]>;

  constructor(
    public dialogRef: MatDialogRef<EventDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private events: EventService
  ) { }

  ngOnInit(): void {
    this.tags$ = this.events.getTags(this.data.id);
  }

  public rsvp() {

  }

  public subscribe() {

  }

}
