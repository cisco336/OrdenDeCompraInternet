import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCambioEstadoComponent } from './dialog-cambio-estado.component';

describe('DialogCambioEstadoComponent', () => {
  let component: DialogCambioEstadoComponent;
  let fixture: ComponentFixture<DialogCambioEstadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCambioEstadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCambioEstadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
