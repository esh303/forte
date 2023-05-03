import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalviewnewComponent } from './internalviewnew.component';

describe('InternalviewnewComponent', () => {
  let component: InternalviewnewComponent;
  let fixture: ComponentFixture<InternalviewnewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalviewnewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalviewnewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
