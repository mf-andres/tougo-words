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
        let translatedWordsObservables: Observable<TranslatedWord>[] = [];
        for (const datamuseWord of datamuseWords) {
          const translatedWordObservable = this.translateEnglishRelatedWordsService.translateWord(datamuseWord)
          translatedWordsObservables.push(translatedWordObservable)
        }
        forkJoin(translatedWordsObservables).subscribe(translatedWords => {
          this.translatedWords = translatedWords
        })  
      });
  }

}
