import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvCurouselComponent } from './tv-curousel.component';

describe('TvCurouselComponent', () => {
  let component: TvCurouselComponent;
  let fixture: ComponentFixture<TvCurouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TvCurouselComponent]
    });
    fixture = TestBed.createComponent(TvCurouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
