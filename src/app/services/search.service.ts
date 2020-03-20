import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { StevensEvent } from '../models/event.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private afs: AngularFirestore) { }

  public getEvents(start: string, end: string): Observable<StevensEvent[]> {
    let now = new Date();
    let future = new Date(now.getTime() + 604800000);

    return this.afs.collection<StevensEvent>('/event', ref => ref.orderBy('title').orderBy('start').startAt(start, now).endAt(end, future).limit(10)).valueChanges({ idField: 'id' });
  }
}
