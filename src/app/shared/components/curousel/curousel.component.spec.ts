import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurouselComponent } from './curousel.component';

describe('CurouselComponent', () => {
  let component: CurouselComponent;
  let fixture: ComponentFixture<CurouselComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CurouselComponent]
    });
    fixture = TestBed.createComponent(CurouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
