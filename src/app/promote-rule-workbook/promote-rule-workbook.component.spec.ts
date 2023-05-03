import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoteRuleWorkbookComponent } from './promote-rule-workbook.component';

describe('PromoteRuleWorkbookComponent', () => {
  let component: PromoteRuleWorkbookComponent;
  let fixture: ComponentFixture<PromoteRuleWorkbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PromoteRuleWorkbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PromoteRuleWorkbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
