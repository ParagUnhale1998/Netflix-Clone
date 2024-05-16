import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTvBannerComponent } from './all-tv-banner.component';

describe('AllTvBannerComponent', () => {
  let component: AllTvBannerComponent;
  let fixture: ComponentFixture<AllTvBannerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllTvBannerComponent]
    });
    fixture = TestBed.createComponent(AllTvBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
