import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import * as _ from 'lodash';
import { StevensEvent } from '../models/event.model';
import { EventTag } from '../models/tag.model';
import { TagChip } from '../content/create/create.component';
import { AngularFirestore } from '@angular/fire/firestore';
import { switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public upcoming$: Observable<StevensEvent[]>;

  constructor(
    private afs: AngularFirestore,
  ) { }

  public createEvent(event: StevensEvent, tags: TagChip[]) {
    this.afs.collection<StevensEvent>('/event').add(event).then(event => {
      for (let i = 0; i < tags.length; i++) {
        var tag = tags[i];
        this.afs.collection<EventTag>('/event_tags').doc(`${tag.id}_${event.id}`).set({
          tagId: tag.id,
          eventId: event.id
        }, { merge: true });
      }
    });
  }

  public getEvents(): Observable<StevensEvent[]> {
    let now = new Date();
    let future = new Date(now.getTime() + 604800000);
    return this.upcoming$ = this.afs.collection<StevensEvent>('/event', ref => ref.orderBy('day').startAt(now).endAt(future)).valueChanges({ idField: 'id' });
  }

  public getEvent(id: string): Observable<StevensEvent> {
    return this.afs.doc<StevensEvent>(`/event/${id}`).valueChanges();
  }

  public updateEvent(id: string, data: StevensEvent): void {

  }

  public deleteEvent(id: string): void {

  }

  public getTags(eventId: string): Observable<EventTag[]> {
    return this.afs.collection<EventTag>('/event_tags', ref => ref.where('eventId', '==', eventId)).get().pipe(
      switchMap(eventTags => {
        let tagIds: string[] = [];
        eventTags.forEach(t => tagIds.push(t.data().tagId));
        if (tagIds.length > 0) {
          return this.afs.collection<EventTag>('tag', ref => ref.where(firestore.FieldPath.documentId(), 'in', tagIds)).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

}
