import { TestBed } from '@angular/core/testing';

import { TranslateEnglishRelatedWordsService } from './translate-english-related-words.service';

describe('TranslateEnglishRelatedWordsService', () => {
  let service: TranslateEnglishRelatedWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TranslateEnglishRelatedWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
