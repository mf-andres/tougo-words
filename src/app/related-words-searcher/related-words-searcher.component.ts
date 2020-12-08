import { Component, OnInit } from '@angular/core';
import { SearchEnglishRelatedWordsService } from '../search-english-related-words.service';
import { RelatedWord } from '../related-word';
import { TranslateEnglishRelatedWordsService } from '../translate-english-related-words.service';
import { TranslatedWord } from '../translated-word';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-related-words-searcher',
  templateUrl: './related-words-searcher.component.html',
  styleUrls: ['./related-words-searcher.component.css'],
})
export class RelatedWordsSearcherComponent implements OnInit {
  word: string = 'example';
  relatedWords: RelatedWord[] = [];
  translatedWords: TranslatedWord[] = [];

  maxNumberOfWords = 20;

  constructor(
    private searchEnglishRelatedWordsService: SearchEnglishRelatedWordsService,
    private translateEnglishRelatedWordsService: TranslateEnglishRelatedWordsService
  ) {}

  ngOnInit(): void {}

  onSearch(): void {
    this.searchEnglishRelatedWordsService
      .search(this.word)
      .subscribe((relatedWords) => {
        relatedWords = relatedWords.slice(0, this.maxNumberOfWords);
        this.relatedWords = relatedWords;
        let translatedWordsObservables: Observable<TranslatedWord>[] = [];
        for (const relatedWord of relatedWords) {
          const translatedWordObservable = this.translateEnglishRelatedWordsService.translateWord(
            relatedWord
          );
          translatedWordsObservables.push(translatedWordObservable);
        }
        forkJoin(translatedWordsObservables).subscribe((translatedWords) => {
          this.translatedWords = translatedWords;
        });
      });
  }
}
