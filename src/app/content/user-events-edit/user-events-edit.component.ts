import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

import { CreateEventComponent } from '../create-event/create-event.component';
import { AuthService } from '../../services/auth.service';
import { EventService } from '../../services/event.service';
import { StevensEvent } from '../../models/event.model';
import { Tag } from '../../models/tag.model';
import { FormData } from '../../content/create-event/create-event.component';

import { firestore } from 'firebase';


@Component({
  selector: 'app-user-events-edit',
  templateUrl: './user-events-edit.component.html',
  styleUrls: ['./user-events-edit.component.scss']
})
export class UserEventsEditComponent {

  eventId = '';
  rsvps: number;

  event$: Observable<StevensEvent>;
  tags$: Observable<Tag[]>;

  @ViewChild(CreateEventComponent) createComponent: CreateEventComponent;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private eventSvc: EventService,
    private _snackBar: MatSnackBar
  ) {
    this.route.params.subscribe(params => {
      this.eventId = params.id;
      this.event$ = this.eventSvc.getEvent(this.eventId);
      this.eventSvc.getRsvpCount(this.eventId).subscribe(val => this.rsvps = val);
    });
  }

  private openSnackBar(message: string, action: string = 'Dismiss', duration: number = 2000) {
    return this._snackBar.open(message, action, {
      duration: duration,
    });
  }

  close(message?: string) {
    if (message) {
      this.openSnackBar(message);
    }
    this.router.navigate(['my-events']);
  }

  update() {
    this.auth.user$.subscribe(async (user) => {
      const { title, description, day, start, end, building, room }: FormData = this.createComponent.eventForm.value;
      const event: StevensEvent = {
        title,
        description,
        day: firestore.Timestamp.fromDate(day),
        start: this.createComponent.times[start].offset,
        end: this.createComponent.times[end].offset,
        building,
        room,
        author: user.displayName,
        authorId: user.uid,
        authorThumbnail: user.photoURL
      };

      if (this.createComponent.fileUpload.file !== null) {
        // TODO: delete old file 
        const url = await this.createComponent.fileUpload.startUpload();
        event.thumbnail = url;
      }

      this.eventSvc.updateEvent(this.eventId, event, this.createComponent.tags);
      this.close(`${title} successfully updated!`)
    });
  }

  delete() {
    let snackBarRef = this.openSnackBar('Event deleted.', "Undo", 5000);
    let undone = false;
    snackBarRef.afterDismissed().subscribe(() => {
      if (!undone) {
        this.eventSvc.deleteEvent(this.eventId);
      }
    })

    snackBarRef.onAction().subscribe(() => {
      undone = true;
      this.router.navigate(['my-events', this.eventId]);
    })

    this.close();
  }

}
