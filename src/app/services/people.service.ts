import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  people$: Observable<User[]>

  constructor(
    private afs: AngularFirestore
  ) {
    this.people$ = this.afs.collection<User>('user').valueChanges();
  }

}
