import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { StevensEvent } from '../models/event.model';
import { Tag, EventTag } from '../models/tag.model';
import { switchMap } from 'rxjs/operators';
import { firestore } from 'firebase';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  eventId: string;
  event$: Observable<StevensEvent>;
  tags$: Observable<Tag>

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore
  ) {
    this.route.params.subscribe(params => {
      this.eventId = params.eventId;
      this.event$ = this.afs.collection('/event').doc<StevensEvent>(this.eventId).valueChanges();
      this.tags$ = this.afs.collection<EventTag>('/event_tags', ref => ref.where('eventId', '==', this.eventId)).get().pipe(
        switchMap(eventTags => {
          let tagIds: string[] = [];
          eventTags.forEach(t => tagIds.push(t.data().tagId));
          if (tagIds.length > 0) {
            return this.afs.collection<Tag>('tag', ref => ref.where(firestore.FieldPath.documentId(), 'in', tagIds)).valueChanges();
          } else {
            return of(null);
          }
        })
      );
    });

  }

  ngOnInit(): void {
  }

}
