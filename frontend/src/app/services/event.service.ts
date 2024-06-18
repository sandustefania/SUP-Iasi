import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../shared/models/Event';

import { EVENTS_BY_ID_URL, EVENTS_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Event[]> {
    return this.http.get<Event[]>(EVENTS_URL);
  }

  getEventById(eventId: string): Observable<Event> {
    return this.http.get<Event>(EVENTS_BY_ID_URL + eventId);
  }
}
