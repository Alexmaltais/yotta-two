import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskIndComponent } from './task-ind.component';

describe('TaskIndComponent', () => {
  let component: TaskIndComponent;
  let fixture: ComponentFixture<TaskIndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskIndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskIndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
