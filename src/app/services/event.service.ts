import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { StevensEvent } from '../models/event.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { EventTag, Tag } from '../models/tag.model';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public upcoming$: Observable<StevensEvent[]>;

  constructor(
    private afs: AngularFirestore,
  ) { }

  public createEvent(data) {
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

  public getEvents(): Observable<StevensEvent[]> {
    let now = new Date();
    let future = new Date(now.getTime() + 604800000);
    return this.upcoming$ = this.afs.collection<StevensEvent>('/event', ref => ref.orderBy('start').startAt(now).endAt(future)).valueChanges({ idField: 'id' });
  }

  public getTags(eventId: string): Observable<Tag[]> {
    return this.afs.collection<EventTag>('/event_tags', ref => ref.where('eventId', '==', eventId)).get().pipe(
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

}
