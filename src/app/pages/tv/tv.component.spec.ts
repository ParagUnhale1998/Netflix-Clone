import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVComponent } from './tv.component';

describe('TVComponent', () => {
  let component: TVComponent;
  let fixture: ComponentFixture<TVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TVComponent]
    });
    fixture = TestBed.createComponent(TVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
