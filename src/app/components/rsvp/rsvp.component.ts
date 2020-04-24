import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth.service';
import { forkJoin } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-rsvp',
  templateUrl: './rsvp.component.html',
  styleUrls: ['./rsvp.component.scss']
})
export class RsvpComponent {

  private id: string;
  private uid: string;

  rsvped: boolean = false;

  constructor(
    private afs: AngularFirestore,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {
    forkJoin([
      this.route.params.pipe(take(1)),
      this.auth.user$.pipe(take(1))
    ]).subscribe(([params, user]) => {
      this.id = params.id;
      this.uid = user.uid;
      this.afs.doc(`rsvp/${params.id}_${user.uid}`).get().subscribe(doc => {
        this.rsvped = doc.exists;
      })
    })
  }

  rsvp() {
    if (this.id && this.uid) {
      this.afs.collection('rsvp').doc(`${this.id}_${this.uid}`).set({
        eventId: this.id,
        tagId: this.uid
      }).then(() => this.rsvped = true);
    }
  }

  unrsvp() {
    if (this.id && this.uid) {
      this.afs.doc(`rsvp/${this.id}_${this.uid}`).delete().then(() => {
        this.rsvped = false;
      });
    }
  }

}
