import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleAcknowledgmentComponent } from './sample-acknowledgment.component';

describe('SampleAcknowledgmentComponent', () => {
  let component: SampleAcknowledgmentComponent;
  let fixture: ComponentFixture<SampleAcknowledgmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SampleAcknowledgmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SampleAcknowledgmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
