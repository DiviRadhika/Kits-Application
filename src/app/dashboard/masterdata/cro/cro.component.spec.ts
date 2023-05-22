import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CroComponent } from './cro.component';

describe('CroComponent', () => {
  let component: CroComponent;
  let fixture: ComponentFixture<CroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
