import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StevensEvent } from '../../models/event.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss']
})
export class UserEventsComponent implements OnInit {

  events$: Observable<StevensEvent[]>;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.pipe(
      map(user => {
        return this.afs.collection<StevensEvent>('/event', ref => ref.where('authorId', '==', user.uid)).valueChanges();
      })
    ).subscribe(events => this.events$ = events)
  }

}
