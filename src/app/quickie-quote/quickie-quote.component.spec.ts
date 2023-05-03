import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickieQuoteComponent } from './quickie-quote.component';

describe('QuickieQuoteComponent', () => {
  let component: QuickieQuoteComponent;
  let fixture: ComponentFixture<QuickieQuoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickieQuoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickieQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
