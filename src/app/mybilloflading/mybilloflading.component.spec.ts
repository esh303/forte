import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MybillofladingComponent } from './mybilloflading.component';

describe('MybillofladingComponent', () => {
  let component: MybillofladingComponent;
  let fixture: ComponentFixture<MybillofladingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MybillofladingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MybillofladingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
