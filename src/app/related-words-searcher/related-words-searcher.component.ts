import { Component, OnInit } from '@angular/core';
import { RelatedWord } from '../related-word';
import { SearchEnglishRelatedWordsService } from '../search-english-related-words.service';
import { DatamuseWord } from '../datamuse-word';
import { TranslateEnglishRelatedWordsService } from '../translate-english-related-words.service';
import { TranslatedWord } from '../translated-word';
import { Observable, throwError, of, forkJoin } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';


@Component({
  selector: 'app-related-words-searcher',
  templateUrl: './related-words-searcher.component.html',
  styleUrls: ['./related-words-searcher.component.css'],
})
export class RelatedWordsSearcherComponent implements OnInit {
  word: string = 'example';
  relatedWords: RelatedWord[] = [];
  datamuseWords: DatamuseWord[] = [];
  translatedWords: TranslatedWord[] = [];
 
  varForTestingConcatenatedRequests: number[] = [];

  googleTranslateUrl = 'https://translation.googleapis.com/language/translate/v2';

  constructor(
    private searchEnglishRelatedWordsService: SearchEnglishRelatedWordsService,
    private translateEnglishRelatedWordsService: TranslateEnglishRelatedWordsService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  onSearch(): void {
    console.log('Searching for ' + this.word);
    this.searchEnglishRelatedWordsService
      .search(this.word)
      .subscribe(datamuseWords => {
        this.datamuseWords = datamuseWords
        // TODO Cambia este map por un for igual que abajo
        const translatedWordsObservables = datamuseWords.map(this.translateEnglishRelatedWordsService.translateWord)
        forkJoin(translatedWordsObservables).subscribe(translatedWords => {
          this.translatedWords = translatedWords
        })  
      });
  }

  onTestTranslation(): void {
    console.log('testing translations')
    const relatedWord: RelatedWord = {word: "table"};
    const relatedWords: RelatedWord[] = [relatedWord, relatedWord, relatedWord]
    let translatedWordsObservables: Observable<TranslatedWord>[] = [];
    // Cambia el bucle for de forma que invoque al servicio en vez de a las funciones de abajo
    // Retoca también los imports
    // Cambiar en la función principal la forma el map por el for
    for (const relatedWord of relatedWords) {
      const translatedWordObservable = this.translateWord(relatedWord)
      translatedWordsObservables.push(translatedWordObservable)
    }
    console.log("observables constructed")
    forkJoin(translatedWordsObservables).subscribe(translatedWords => {
      this.translatedWords = translatedWords
    })  
  }

  // Para depurar la traducción traje estas dos funciones a este componente
  // Hay que probar a cambiar el bucle for de arriba de forma que invoque al servicio
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
