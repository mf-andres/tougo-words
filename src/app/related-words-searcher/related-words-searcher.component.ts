import { Component, OnInit } from '@angular/core';
import { RelatedWord } from '../related-word';
import { SearchEnglishRelatedWordsService } from '../search-english-related-words.service';
import { DatamuseWord } from '../datamuse-word';
import { Observable, of, forkJoin } from 'rxjs';

@Component({
  selector: 'app-related-words-searcher',
  templateUrl: './related-words-searcher.component.html',
  styleUrls: ['./related-words-searcher.component.css'],
})
export class RelatedWordsSearcherComponent implements OnInit {
  word: string = 'example';
  relatedWords: RelatedWord[] = [];
  datamuseWords: DatamuseWord[] = [];
  varForTestingConcatenatedRequests: number[] = [];

  constructor(
    private searchEnglishRelatedWordsService: SearchEnglishRelatedWordsService
  ) {}

  ngOnInit(): void {}

  onSearch(): void {
    console.log('Searching for ' + this.word);
    this.searchEnglishRelatedWordsService
      .search(this.word)
      .subscribe((datamuseWords) => this.datamuseWords = datamuseWords);
  }

  firstRequest(): Observable<number[]> {
    const myNumbers = [1, 2, 3, 4, 5];
    return of(myNumbers)
  }

  secondRequest(myNumber: number): Observable<number> {
    myNumber += 1
    return of(myNumber)
  }

  thirdRequest(myNumber: number): Observable<number> {
    myNumber += 2
    return of(myNumber)
  }

  onTestConcatenatedRequests(): void {
    console.log('testing concatenated request')
    this.firstRequest().subscribe(myNumbers => {
      const myProcessedNumbers = myNumbers.map(this.secondRequest)
      forkJoin(myProcessedNumbers).subscribe(myNumbers => {
        const myProcessedNumbers = myNumbers.map(this.thirdRequest)
        forkJoin(myProcessedNumbers).subscribe(myNumbers => this.varForTestingConcatenatedRequests = myNumbers)
      })
    });
  }
}
