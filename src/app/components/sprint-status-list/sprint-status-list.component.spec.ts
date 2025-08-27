import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintStatusListComponent } from './sprint-status-list.component';

describe('SprintStatusListComponent', () => {
  let component: SprintStatusListComponent;
  let fixture: ComponentFixture<SprintStatusListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintStatusListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintStatusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
