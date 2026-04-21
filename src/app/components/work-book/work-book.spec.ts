import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkBook } from './work-book';

describe('WorkBook', () => {
  let component: WorkBook;
  let fixture: ComponentFixture<WorkBook>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkBook]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WorkBook);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
