import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { DatamuseWord } from './datamuse-word';

@Injectable({
  providedIn: 'root',
})
export class SearchEnglishRelatedWordsService {
  datamuseUrl = 'https://api.datamuse.com/words';

  constructor(private http: HttpClient) {}

  search(word: string): Observable<DatamuseWord[]> {
    const options = { params: new HttpParams().set('rel_trg', word) };
    return this.http
      .get<DatamuseWord[]>(this.datamuseUrl, options)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
