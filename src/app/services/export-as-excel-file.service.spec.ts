import { TestBed } from '@angular/core/testing';

import { ExportAsExcelFileService } from './export-as-excel-file.service';

describe('ExportAsExcelFileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportAsExcelFileService = TestBed.get(ExportAsExcelFileService);
    expect(service).toBeTruthy();
  });
});
