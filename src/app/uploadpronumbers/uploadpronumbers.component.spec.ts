import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadpronumbersComponent } from './uploadpronumbers.component';

describe('UploadpronumbersComponent', () => {
  let component: UploadpronumbersComponent;
  let fixture: ComponentFixture<UploadpronumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadpronumbersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadpronumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
