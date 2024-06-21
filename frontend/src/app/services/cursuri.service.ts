import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curs } from '../shared/models/Curs';
import { CURSURI_BY_ID_URL, CURSURI_URL } from '../shared/constants/urls';

@Injectable({
  providedIn: 'root',
})
export class CursuriService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Curs[]> {
    return this.http.get<Curs[]>(CURSURI_URL);
  }

  getCursById(cursuriId: string): Observable<Curs> {
    return this.http.get<Curs>(CURSURI_BY_ID_URL + cursuriId);
  }
}
