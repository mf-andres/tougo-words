import { TestBed } from '@angular/core/testing';

import { GetInfoAboutJapaneseRelatedWordsService } from './get-info-about-japanese-related-words.service';

describe('GetInfoAboutJapaneseRelatedWordsService', () => {
  let service: GetInfoAboutJapaneseRelatedWordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetInfoAboutJapaneseRelatedWordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
