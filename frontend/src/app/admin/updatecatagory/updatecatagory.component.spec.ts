import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecatagoryComponent } from './updatecatagory.component';

describe('UpdatecatagoryComponent', () => {
  let component: UpdatecatagoryComponent;
  let fixture: ComponentFixture<UpdatecatagoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecatagoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
