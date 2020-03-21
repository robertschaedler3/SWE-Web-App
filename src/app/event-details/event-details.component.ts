import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { StevensEvent } from '../models/event.model';
import { Tag } from '../models/tag.model';
import { EventService } from '../services/event.service';
import { fadeUp, chipListFader } from '../animations/load-animation';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
  animations: [fadeUp, chipListFader]
})
export class EventDetailsComponent implements OnInit {

  eventId: string;
  event$: Observable<StevensEvent>;
  tags$: Observable<Tag[]>

  constructor(
    private route: ActivatedRoute,
    private afs: AngularFirestore,
    private eventSvc: EventService
  ) {
    this.route.params.subscribe(params => {
      this.eventId = params.eventId;
      this.event$ = this.afs.collection('/event').doc<StevensEvent>(this.eventId).valueChanges();
      this.tags$ = this.eventSvc.getTags(this.eventId);
    });

  }

  ngOnInit(): void {
  }

}
