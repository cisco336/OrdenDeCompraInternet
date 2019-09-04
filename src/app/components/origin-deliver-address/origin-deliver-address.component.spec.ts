import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OriginDeliverAddressComponent } from './origin-deliver-address.component';

describe('OriginDeliverAddressComponent', () => {
  let component: OriginDeliverAddressComponent;
  let fixture: ComponentFixture<OriginDeliverAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OriginDeliverAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OriginDeliverAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
