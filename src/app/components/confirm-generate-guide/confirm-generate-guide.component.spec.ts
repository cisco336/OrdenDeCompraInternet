import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmGenerateGuideComponent } from './confirm-generate-guide.component';

describe('ConfirmGenerateGuideComponent', () => {
  let component: ConfirmGenerateGuideComponent;
  let fixture: ComponentFixture<ConfirmGenerateGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmGenerateGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmGenerateGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
