import { Component, OnInit } from '@angular/core';
import { RelatedWord } from '../related-word';
import { SearchEnglishRelatedWordsService } from '../search-english-related-words.service';
import { DatamuseWord } from '../datamuse-word';

@Component({
  selector: 'app-related-words-searcher',
  templateUrl: './related-words-searcher.component.html',
  styleUrls: ['./related-words-searcher.component.css'],
})
export class RelatedWordsSearcherComponent implements OnInit {
  word: string = 'example';
  relatedWords: RelatedWord[] = [];
  datamuseWords: DatamuseWord[] = [];

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
}
