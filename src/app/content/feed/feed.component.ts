import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event.service';
import { Router } from '@angular/router';
import { cardListFader } from 'src/app/animations/load-animation';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
  animations: [cardListFader]
})
export class FeedComponent implements OnInit {

  constructor(
    public events: EventService,
    private router: Router
  ) {
    this.events.getEvents();
  }

  ngOnInit(): void {
  }

  displayDetails(id: string) {
    console.log(id);
    this.router.navigate(['/details', id]);
  }
}
