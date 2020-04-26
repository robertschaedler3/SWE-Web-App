import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { EventService } from '../../services/event.service';
import { StevensEvent } from '../../models/event.model';

@Component({
  selector: 'app-discover-feed',
  templateUrl: './discover-feed.component.html',
  styleUrls: ['./discover-feed.component.scss']
})
export class DiscoverFeedComponent {

  tagId: string;
  events$: Observable<StevensEvent[]>

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventSvc: EventService
  ) {
    this.route.params.subscribe(params => {
      this.tagId = params.id;
      this.events$ = this.eventSvc.getEventsByTag(this.tagId);
    })
  }

  displayDetails(eventId: string) {
    this.router.navigate(['feed', eventId]);
  }

}
