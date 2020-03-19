import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { StevensEvent } from '../models/event.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public upcoming$: Observable<StevensEvent[]>;

  constructor(
    private afs: AngularFirestore,
  ) {
    // this.upcoming$ = this.afs.collection<StevensEvent>('/event').valueChanges();
    let now = new Date();
    let future = new Date(now.getTime() + 604800000);
    this.upcoming$ = this.afs.collection<StevensEvent>('/event', ref => ref.orderBy('start').startAt(now).endAt(future)).valueChanges();
  }

  public createEvent(data: StevensEvent) {
    this.afs.collection<StevensEvent>('/event').add(data);
  }

}
