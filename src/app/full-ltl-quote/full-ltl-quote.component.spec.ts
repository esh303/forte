import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullLtlQuoteComponent } from './full-ltl-quote.component';

describe('FullLtlQuoteComponent', () => {
  let component: FullLtlQuoteComponent;
  let fixture: ComponentFixture<FullLtlQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullLtlQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullLtlQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
