import { Component, OnInit } from '@angular/core';
import { RelatedWord } from '../related-word'

@Component({
  selector: 'app-related-words-searcher',
  templateUrl: './related-words-searcher.component.html',
  styleUrls: ['./related-words-searcher.component.css']
})
export class RelatedWordsSearcherComponent implements OnInit {

  word: string = "example";

  relatedWords: RelatedWord[] = [];

  constructor() { }

  ngOnInit(): void {
  }
  
  onSearch(): void {
    console.log("Searching for " + this.word)
  }

}
