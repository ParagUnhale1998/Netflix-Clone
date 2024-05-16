import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieBannerComponent } from './movie-banner.component';

describe('MovieBannerComponent', () => {
  let component: MovieBannerComponent;
  let fixture: ComponentFixture<MovieBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieBannerComponent]
    });
    fixture = TestBed.createComponent(MovieBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
