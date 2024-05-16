import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMoviesBannerComponent } from './all-movies-banner.component';

describe('AllMoviesBannerComponent', () => {
  let component: AllMoviesBannerComponent;
  let fixture: ComponentFixture<AllMoviesBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllMoviesBannerComponent]
    });
    fixture = TestBed.createComponent(AllMoviesBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
