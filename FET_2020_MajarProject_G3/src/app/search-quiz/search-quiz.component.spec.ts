import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchQuizComponent } from './search-quiz.component';

describe('SearchQuizComponent', () => {
  let component: SearchQuizComponent;
  let fixture: ComponentFixture<SearchQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchQuizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
