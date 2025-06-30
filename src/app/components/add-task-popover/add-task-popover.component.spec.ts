import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskPopoverComponent } from './add-task-popover.component';

describe('AddTaskPopoverComponent', () => {
  let component: AddTaskPopoverComponent;
  let fixture: ComponentFixture<AddTaskPopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskPopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
