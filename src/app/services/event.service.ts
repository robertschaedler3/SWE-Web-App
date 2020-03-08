import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ScheduledEvent } from '../utils/scheduled-event.model';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { Event } from '../interfaces/event.interface';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public events$: Observable<ScheduledEvent[]>;

  constructor(private http: HttpClient) { }

  public getEvents() {
    // TODO: Add pagination/dynamic query on scroll
    return this.events$ = this.http.get<Event>(`/api/events`).pipe(
      map(data => _.values(data)),
      tap(console.log),
    );
  }

  public createEvent(data: Event) {
    return this.http.post<Event>(`/api/events`, data);
  }

}
