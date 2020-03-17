import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { StevensEvent } from '../models/event.model';


@Injectable({
  providedIn: 'root'
})
export class EventService {

  public events$: Observable<StevensEvent[]>;

  constructor(private http: HttpClient) { }

  public getEvents() {
    // TODO: Add pagination/dynamic query on scroll
    return this.events$ = this.http.get<StevensEvent>(`/api/events`).pipe(
      map(data => _.values(data)),
      tap(console.log),
    );
  }

  public createEvent(data: StevensEvent) {
    return this.http.post<StevensEvent>(`/api/events`, data);
  }

}
