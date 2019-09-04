import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesConfigComponent } from './packages-config.component';

describe('PackagesConfigComponent', () => {
  let component: PackagesConfigComponent;
  let fixture: ComponentFixture<PackagesConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackagesConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackagesConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
