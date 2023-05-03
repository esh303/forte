import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadWorksheetComponent } from './upload-worksheet.component';

describe('UploadWorksheetComponent', () => {
  let component: UploadWorksheetComponent;
  let fixture: ComponentFixture<UploadWorksheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadWorksheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadWorksheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
