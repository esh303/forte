import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestQouteComponent } from './request-qoute.component';

describe('RequestQouteComponent', () => {
  let component: RequestQouteComponent;
  let fixture: ComponentFixture<RequestQouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestQouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestQouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
