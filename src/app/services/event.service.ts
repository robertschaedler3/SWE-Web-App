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
    this.upcoming$ = this.afs.collection<StevensEvent>('/event').valueChanges();
  }

  public createEvent(data: StevensEvent) {
    this.afs.collection<StevensEvent>('/event').add(data);
  }

}
