import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-user-events-edit',
  templateUrl: './user-events-edit.component.html',
  styleUrls: ['./user-events-edit.component.scss']
})
export class UserEventsEditComponent implements OnInit {

  eventId = '';

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.eventId = params.id;
    });
  }

  ngOnInit(): void {
  }

}
