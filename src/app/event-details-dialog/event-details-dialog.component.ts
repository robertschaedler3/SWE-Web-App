import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';

interface EventTag {
  eventId: string;
  tagId: string;
}

interface Tag {
  name: string;
}

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
    private afs: AngularFirestore
  ) { }

  ngOnInit(): void {
    this.tags$ = this.afs.collection<EventTag>('/event_tags', ref => ref.where('eventId', '==', this.data.id)).get().pipe(
      switchMap(eventTags => {
        let tagIds: string[] = [];
        eventTags.forEach(t => tagIds.push(t.data().tagId));
        if (tagIds.length > 0) {
          return this.afs.collection<Tag>('tag', ref => ref.where(firestore.FieldPath.documentId(), 'in', tagIds)).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  public rsvp() {

  }

  public subscribe() {

  }

}
