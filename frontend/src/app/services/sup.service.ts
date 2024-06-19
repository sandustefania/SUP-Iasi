import { Injectable } from '@angular/core';
import { IContactUs } from '../shared/interfaces/IContactUs';
import { HttpClient } from '@angular/common/http';
import {
  ADD_EMAIL_NEWSLETTER_URL,
  ADD_EVENT_ITEM_URL,
  ADD_MESSAGE_URL,
  ADD_RENT_SUPS_URL,
  ADD_REVIEW_URL,
  DELETE_EVENT_ITEM_URL,
  GET_EMAIL_NEWSLETTER_URL,
  GET_MESSAGES_URL,
  GET_RENT_SUPS_URL,
  GET_REVIEWS_URL,
  GET_SUPS_AVAILABLE_URL,
  WEATHER_URL,
} from '../shared/constants/urls';
import { Observable } from 'rxjs';
import { IReview } from '../shared/interfaces/IReview';
import { IEmail } from '../shared/interfaces/IEmail';
import { IRentSup } from '../shared/interfaces/IRentSup';

@Injectable({
  providedIn: 'root',
})
export class SupService {
  constructor(private http: HttpClient) {}

  addEventItem(eventItem: any) {
    return this.http.post(ADD_EVENT_ITEM_URL, eventItem);
  }

  addMessage(contactUsForm: IContactUs) {
    return this.http.post<IContactUs>(ADD_MESSAGE_URL, contactUsForm);
  }

  deleteEventItem(foodId: any): Observable<any> {
    return this.http.delete(DELETE_EVENT_ITEM_URL + foodId);
  }

  getMessages(): Observable<IContactUs[]> {
    return this.http.get<IContactUs[]>(GET_MESSAGES_URL);
  }

  addReview(reviewForm: IReview) {
    return this.http.post<IReview>(ADD_REVIEW_URL, reviewForm);
  }

  getReviews(): Observable<IReview[]> {
    return this.http.get<IReview[]>(GET_REVIEWS_URL);
  }

  addEmailNewsletter(email: IEmail) {
    return this.http.post<IEmail>(ADD_EMAIL_NEWSLETTER_URL, email);
  }

  getEmailNewsletter(): Observable<IEmail[]> {
    return this.http.get<IEmail[]>(GET_EMAIL_NEWSLETTER_URL);
  }

  loadCurrentWeather(): Observable<any> {
    return this.http.get(WEATHER_URL);
  }

  addRentSups(rentSupForm: IRentSup): Observable<any> {
    return this.http.post<any>(ADD_RENT_SUPS_URL, rentSupForm);
  }

  getRentSup(): Observable<IRentSup[]> {
    return this.http.get<IRentSup[]>(GET_RENT_SUPS_URL);
  }

  getSupsAvailable(date: any): Observable<any> {
    return this.http.get<any>(`${GET_SUPS_AVAILABLE_URL}/${date}`);
  }
}
