import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationGridComponent } from './preparation-grid.component';

describe('PreparationGridComponent', () => {
  let component: PreparationGridComponent;
  let fixture: ComponentFixture<PreparationGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparationGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparationGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
