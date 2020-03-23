import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { switchMap } from 'rxjs/operators';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  invalidCredential: boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);
    if (credential.user.email.endsWith('@stevens.edu')) {
      return this.updateUserData(credential.user);
    }
    this.invalidCredential = true;
  }

  async signOut() {
    this.router.navigate(['/login']);
    return this.afAuth.auth.signOut();
  }

  private updateUserData({ uid, displayName, email, photoURL }) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${uid}`);
    const data = {
      uid,
      displayName,
      email,
      photoURL,
      roles: {
        student: true
      }
    };
    this.router.navigate(['/upcoming']);
    return userRef.set(data, { merge: true });
  }

  public canRead(user: User): boolean {
    const allowed = ['admin', 'organizer', 'student'];
    return this.checkAuthorization(user, allowed);
  }

  public canEdit(user: User): boolean {
    const allowed = ['admin', 'organizer'];
    return this.checkAuthorization(user, allowed);
  }

  public canDelete(user: User): boolean {
    const allowed = ['admin', 'organizer'];
    return this.checkAuthorization(user, allowed);
  }


  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }


}
