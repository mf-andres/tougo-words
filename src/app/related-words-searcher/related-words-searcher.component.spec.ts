import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedWordsSearcherComponent } from './related-words-searcher.component';

describe('RelatedWordsSearcherComponent', () => {
  let component: RelatedWordsSearcherComponent;
  let fixture: ComponentFixture<RelatedWordsSearcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedWordsSearcherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedWordsSearcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
