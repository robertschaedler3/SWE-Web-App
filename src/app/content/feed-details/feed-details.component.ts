import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { StevensEvent } from '../../models/event.model';
import { EventTag } from '../../models/tag.model';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-feed-details',
  templateUrl: './feed-details.component.html',
  styleUrls: ['./feed-details.component.scss']
})
export class FeedDetailsComponent {

  eventId: string;
  event$: Observable<StevensEvent>;
  tags$: Observable<EventTag[]>

  constructor(
    private route: ActivatedRoute,
    private eventSvc: EventService
  ) {
    this.route.params.subscribe(params => {
      this.eventId = params.id;
      this.event$ = this.eventSvc.getEvent(this.eventId);
      this.tags$ = this.eventSvc.getTags(this.eventId);
    });

  }

}
