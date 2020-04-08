import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StevensEvent } from '../models/event.model';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Tag } from '../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private afs: AngularFirestore) { }

  public getEvents(start: string, end: string): Observable<StevensEvent[]> {
    let now = new Date();
    let future = new Date(now.getTime() + 60480000);
    return this.afs.collection<StevensEvent>('/event', ref => ref.orderBy('title').orderBy('start').startAt(start, now).endAt(end, future).limit(3)).valueChanges({ idField: 'id' });
  }

  public getPeople(start: string, end: string): Observable<User[]> {
    return this.afs.collection<User>('/user', ref => ref.orderBy('displayName').startAt(start).endAt(end).limit(3)).valueChanges({ idField: 'id' });
  }

  public getTags(start: string, end: string): Observable<Tag[]> {
    return this.afs.collection<Tag>('/tag', ref => ref.orderBy('name').startAt(start).endAt(end).limit(3)).valueChanges({ idField: 'id' });
  }
}
