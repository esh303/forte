import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRequestComponent } from './active-request.component';

describe('ActiveRequestComponent', () => {
  let component: ActiveRequestComponent;
  let fixture: ComponentFixture<ActiveRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
