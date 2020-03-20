import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { StevensEvent } from '../models/event.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { DialogResult } from '../create-event-dialog/create-event-dialog.component';

interface EventTag {
  tagId: string;
  eventId: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public upcoming$: Observable<StevensEvent[]>;

  constructor(
    private afs: AngularFirestore,
  ) {
    let now = new Date();
    let future = new Date(now.getTime() + 6048000000);
    this.upcoming$ = this.afs.collection<StevensEvent>('/event', ref => ref.orderBy('start').startAt(now).endAt(future)).valueChanges({ idField: 'id' });
  }

  public createEvent(data: DialogResult) {
    console.log(data);
    let newEvent: StevensEvent = data.event;
    this.afs.collection<StevensEvent>('/event').add(newEvent).then(event => {
      data.tags.forEach(tag => {
        this.afs.collection<EventTag>('/event_tags').doc(`${tag.id}_${event.id}`).set({
          tagId: tag.id,
          eventId: event.id
        }, { merge: true });
      });

    });
  }

}
