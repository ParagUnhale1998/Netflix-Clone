import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerHomeComponent } from './banner-home.component';

describe('BannerHomeComponent', () => {
  let component: BannerHomeComponent;
  let fixture: ComponentFixture<BannerHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerHomeComponent]
    });
    fixture = TestBed.createComponent(BannerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
