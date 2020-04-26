import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StevensEvent } from '../../models/event.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { listFader, fadeUp } from '../../animations/load-animation';

@Component({
  selector: 'app-user-events',
  templateUrl: './user-events.component.html',
  styleUrls: ['./user-events.component.scss'],
  animations: [listFader, fadeUp]
})
export class UserEventsComponent implements OnInit {

  events$: Observable<StevensEvent[]>;
  events: StevensEvent[] = [];

  showOutlet: boolean = false;
  rsvps: number;

  constructor(
    private afs: AngularFirestore,
    private afAuth: AngularFireAuth,
  ) { }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      this.afs.collection<StevensEvent>('/event', ref => ref.where('authorId', '==', user.uid)).valueChanges({ idField: 'id' }).subscribe(events => {
        this.events = events;
        console.log(events)
      });
    });
  }

  onActivate(event: any) {
    this.showOutlet = true;
  }

  onDeactivate(event: any) {
    this.showOutlet = false;
  }

}
