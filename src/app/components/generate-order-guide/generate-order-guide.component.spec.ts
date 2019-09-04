import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateOrderGuideComponent } from './generate-order-guide.component';

describe('GenerateOrderGuideComponent', () => {
  let component: GenerateOrderGuideComponent;
  let fixture: ComponentFixture<GenerateOrderGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateOrderGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateOrderGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
