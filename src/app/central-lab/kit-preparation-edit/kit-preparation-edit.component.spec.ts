import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KitPreparationEditComponent } from './kit-preparation-edit.component';

describe('KitPreparationEditComponent', () => {
  let component: KitPreparationEditComponent;
  let fixture: ComponentFixture<KitPreparationEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KitPreparationEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KitPreparationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
