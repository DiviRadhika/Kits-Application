import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitPreparationComponent } from './kit-preparation.component';

describe('KitPreparationComponent', () => {
  let component: KitPreparationComponent;
  let fixture: ComponentFixture<KitPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitPreparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
