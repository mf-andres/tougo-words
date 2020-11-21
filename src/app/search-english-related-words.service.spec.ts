import { TestBed } from '@angular/core/testing';

import { SearchEnglishRelatedWordsService } from './search-english-related-words.service';

describe('SearchEnglishRelatedWordsService', () => {
  let service: SearchEnglishRelatedWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchEnglishRelatedWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
