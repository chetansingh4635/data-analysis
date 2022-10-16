import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashSegmentComponent } from './cash-segment.component';

describe('CashSegmentComponent', () => {
  let component: CashSegmentComponent;
  let fixture: ComponentFixture<CashSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CashSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
