import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetImgComponent } from './bottom-sheet-img.component';

describe('BottomSheetImgComponent', () => {
  let component: BottomSheetImgComponent;
  let fixture: ComponentFixture<BottomSheetImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomSheetImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomSheetImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
