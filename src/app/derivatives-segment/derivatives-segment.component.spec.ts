import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DerivativesSegmentComponent } from './derivatives-segment.component';

describe('DerivativesSegmentComponent', () => {
  let component: DerivativesSegmentComponent;
  let fixture: ComponentFixture<DerivativesSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DerivativesSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DerivativesSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
