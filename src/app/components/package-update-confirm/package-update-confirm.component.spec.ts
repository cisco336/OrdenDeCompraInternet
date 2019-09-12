import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageUpdateConfirmComponent } from './package-update-confirm.component';

describe('PackageUpdateConfirmComponent', () => {
  let component: PackageUpdateConfirmComponent;
  let fixture: ComponentFixture<PackageUpdateConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageUpdateConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageUpdateConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
