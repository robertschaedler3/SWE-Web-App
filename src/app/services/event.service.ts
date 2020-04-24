import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';

import { StevensEvent } from '../models/event.model';
import { Tag, EventTag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  public upcoming$: Observable<StevensEvent[]>;

  constructor(
    private afs: AngularFirestore,
  ) { }


  private addTags(eventId: string, tags: Tag[]) {
    for (let i = 0; i < tags.length; i++) {
      var tag = tags[i];
      this.afs.collection<EventTag>('/event_tags').doc(`${tag.id}_${eventId}`).set({
        tagId: tag.id,
        eventId: eventId
      }, { merge: true });
    }
  }

  private deleteTags(eventId: string) {
    this.afs.collection<EventTag>('event_tag', ref => ref.where('eventId', '==', eventId)).get().pipe(
      map(tags => {
        tags.forEach(tag => {
          this.afs.doc(`event_tag/${tag.id}`).delete();
        })
      })
    )
  }

  public createEvent(event: StevensEvent, tags: Tag[]) {
    this.afs.collection<StevensEvent>('/event').add(event).then(event => {
      this.addTags(event.id, tags);
    });
  }

  public getEvents(): Observable<StevensEvent[]> {
    let now = new Date();
    let future = new Date(now.getTime() + 604800000);
    return this.upcoming$ = this.afs.collection<StevensEvent>('/event', ref => ref.orderBy('day').startAt(now).endAt(future)).valueChanges({ idField: 'id' });
  }

  public getEventsByTag(tagId: string): Observable<StevensEvent[]> {
    return this.afs.collection<EventTag>('/event_tags', ref => ref.where('tagId', '==', tagId)).get().pipe(
      switchMap(eventTags => {
        let eventIds: string[] = [];
        eventTags.forEach(t => eventIds.push(t.data().eventId));
        if (eventIds.length > 0) {
          return this.afs.collection<StevensEvent>('event', ref => ref.where(firestore.FieldPath.documentId(), 'in', eventIds)).valueChanges({ idField: 'id' });
        } else {
          return of(null);
        }
      })
    )
  }

  public getEvent(id: string): Observable<StevensEvent> {
    return this.afs.doc<StevensEvent>(`/event/${id}`).valueChanges();
  }

  public updateEvent(id: string, data: StevensEvent, tags: Tag[]): void {
    this.afs.doc<StevensEvent>(`event/${id}`).update(data).then(() => {
      this.addTags(id, tags);
    });
  }

  public deleteEvent(eventId: string): void {
    this.afs.doc(`event/${eventId}`).delete().then(() => {
      this.deleteTags(eventId);
    })
  }

  public getTags(eventId: string): Observable<Tag[]> {
    return this.afs.collection<EventTag>('/event_tags', ref => ref.where('eventId', '==', eventId)).get().pipe(
      switchMap(eventTags => {
        let tagIds: string[] = [];
        eventTags.forEach(t => tagIds.push(t.data().tagId));
        if (tagIds.length > 0) {
          return this.afs.collection<EventTag>('tag', ref => ref.where(firestore.FieldPath.documentId(), 'in', tagIds))
            .valueChanges({ idField: 'id' });
        } else {
          return of(null);
        }
      })
    );
  }

}
