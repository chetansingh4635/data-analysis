import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuturesSegmentComponent } from './futures-segment.component';

describe('FuturesSegmentComponent', () => {
  let component: FuturesSegmentComponent;
  let fixture: ComponentFixture<FuturesSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuturesSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuturesSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
