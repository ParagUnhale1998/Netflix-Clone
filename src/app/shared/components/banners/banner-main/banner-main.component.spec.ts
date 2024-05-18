import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerMainComponent } from './banner-main.component';

describe('BannerMainComponent', () => {
  let component: BannerMainComponent;
  let fixture: ComponentFixture<BannerMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BannerMainComponent]
    });
    fixture = TestBed.createComponent(BannerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
