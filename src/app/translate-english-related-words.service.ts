import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { RelatedWord } from './related-word';

@Injectable({
  providedIn: 'root'
})
export class TranslateEnglishRelatedWordsService {

  constructor() { }

  translateWord(relatedWord: RelatedWord): Observable<TranslatedWord> {
    let translateWord = new Object();
    translateWord.word = relatedWord.word;
    return of(translateWord) 
  }
}
