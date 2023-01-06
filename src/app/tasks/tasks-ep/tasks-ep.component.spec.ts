import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksEpComponent } from './tasks-ep.component';

describe('TasksEpComponent', () => {
  let component: TasksEpComponent;
  let fixture: ComponentFixture<TasksEpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksEpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksEpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
