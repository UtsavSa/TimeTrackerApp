import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CalendarMonthComponent } from './calender-month.component';

describe('CalendarMonthComponent', () => {
  let component: CalendarMonthComponent;
  let fixture: ComponentFixture<CalendarMonthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,   // provides Router for the component
        CalendarMonthComponent // standalone component under test
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarMonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
