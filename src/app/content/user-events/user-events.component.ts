import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StevensEvent } from '../../models/event.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { listFader } from '../../animations/load-animation';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss'],
  animations: [listFader]
})
export class UserEventsComponent implements OnInit {

  events$: Observable<StevensEvent[]>;

  showOutlet: boolean;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.pipe(
      map(user => {
        return this.afs.collection<StevensEvent>('/event', ref => ref.where('authorId', '==', user.uid)).valueChanges({ idField: 'id' });
      })
    ).subscribe(events => this.events$ = events);
  }

  onActivate(event: any) {
    this.showOutlet = true;
  }

  onDeactivate(event: any) {
    this.showOutlet = false;
  }

}
