import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeywordsDetailsComponent } from './keywords-details.component';

describe('KeywordsDetailsComponent', () => {
  let component: KeywordsDetailsComponent;
  let fixture: ComponentFixture<KeywordsDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KeywordsDetailsComponent]
    });
    fixture = TestBed.createComponent(KeywordsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
