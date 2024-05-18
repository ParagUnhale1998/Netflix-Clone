import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDetailsComponent } from './banner-details.component';

describe('BannerDetailsComponent', () => {
  let component: BannerDetailsComponent;
  let fixture: ComponentFixture<BannerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerDetailsComponent]
    });
    fixture = TestBed.createComponent(BannerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
