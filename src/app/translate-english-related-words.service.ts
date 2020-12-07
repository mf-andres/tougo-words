import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { RelatedWord } from './related-word';
import { TranslatedWord } from './translated-word';

@Injectable({
  providedIn: 'root'
})
export class TranslateEnglishRelatedWordsService {
  googleTranslateUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(private http: HttpClient) {}

  translateWord(relatedWord: RelatedWord): Observable<TranslatedWord> {
    const translationRequest = {q: relatedWord.word, source: "en", target: "ja", format: "text"}
    const options = { params: new HttpParams().set('key', 'AIzaSyBI7M---IiAh89dcEbLxbJVFcwFJ3i5GvA') };
    return this.http
      .post<TranslatedWord>(this.googleTranslateUrl, translationRequest, options)
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
