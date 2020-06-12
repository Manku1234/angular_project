import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewcatagoryComponent } from './viewcatagory.component';

describe('ViewcatagoryComponent', () => {
  let component: ViewcatagoryComponent;
  let fixture: ComponentFixture<ViewcatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewcatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewcatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
