import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduledEvent } from '../utils/scheduled-event.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  events$: Observable<ScheduledEvent[]>;

  constructor() { }

  ngOnInit() {

  }

}
