import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAnimeComponent } from './all-anime.component';

describe('AllAnimeComponent', () => {
  let component: AllAnimeComponent;
  let fixture: ComponentFixture<AllAnimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAnimeComponent]
    });
    fixture = TestBed.createComponent(AllAnimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
