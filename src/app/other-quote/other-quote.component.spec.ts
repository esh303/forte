import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherQuoteComponent } from './other-quote.component';

describe('OtherQuoteComponent', () => {
  let component: OtherQuoteComponent;
  let fixture: ComponentFixture<OtherQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
