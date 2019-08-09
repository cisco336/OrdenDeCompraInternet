import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepperDetallesComponent } from './stepper-detalles.component';

describe('StepperDetallesComponent', () => {
  let component: StepperDetallesComponent;
  let fixture: ComponentFixture<StepperDetallesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepperDetallesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepperDetallesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
