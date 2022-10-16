import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsSegmentComponent } from './options-segment.component';

describe('OptionsSegmentComponent', () => {
  let component: OptionsSegmentComponent;
  let fixture: ComponentFixture<OptionsSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionsSegmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OptionsSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
